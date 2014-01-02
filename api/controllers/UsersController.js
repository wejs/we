/**
 * UsersController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var passport = require('passport');
var fs = require('fs');

module.exports = {

  index: function (req, res) {
    //console.log('sending email');
    //console.log(sails.config.siteEmail);
    //EmailService.sendInviteEmail({email: 'alberto.souza.99@gmail.com', name: 'Alberto Souza'});

    Users.find({})
    .limit(10)
    .sort('name ASC')
    .done(function(err, users) {

      // Error handling
      if (err) {
        return console.log(err);

      // Found multiple users!
      } else {
        res.format({
           'text/html': function(){
             res.view({
                users: users
              });
           },
     
           'application/json': function(){
             res.send(users);
           }
        });
      }
    });
  },

  signup: function (req, res) {
    res.view();
  },

  login: function (req, res, next) {
      var email = req.param("email");
      var password = req.param("password");

      Users.findOneByEmail(email).done(function(err, usr) {
          if (err) {
              res.send(500, { error: res.i18n("DB Error") });
          } else {
              if (usr) {
                  if (usr.verifyPassword(password)) {
                      passport.authenticate('local', function(err, usr, info) {

                        if (err) return next(err);
                        if (!usr) return res.redirect('/login');

                        req.logIn(usr, function(err){
                          if(err) return next(err);

                          res.send(usr);
                        });

                      })(req, res, next)

                  } else {
                      res.send(400, { error: res.i18n("Wrong Password") });
                  }
              } else {
                  res.send(404, { error: res.i18n("User not Found") });
              }
          }
      });
  },

  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },

  // Signup function
  create: function (req, res, next) {
    var user = {};
    user.name = req.param("name");
    user.email = req.param("email");
    user.password = req.param("password");

    var confirmPassword = req.param("confirmPassword");
    var errors;

    errors = validSignup(user, confirmPassword);

    if( errors.length >0 ){
      // error on data or confirm password
      res.send({
        errors: errors
      });
    } else {

      Users.findOneByEmail(user.email).done(function(err, usr){
        if (err) {
            res.send(500, { error: res.i18n("DB Error") });
        } else if ( usr ) {
            res.send(400, {error: res.i18n("Email already Taken")});
        } else {
            Users.create(user).done(function(error, newUser) {
              if (error) {
                console.error(error);
                res.send(500, {error: res.i18n("DB Error") });
              } else {
                req.logIn(newUser, function(err){
                  if(err) return next(err);

                  res.send({
                    user: newUser
                  });
                });

              }
          });
        }
      });
    }
  },

  update: function(req, res, next) {
    sails.log('update');
    sails.log(req.params);

    next();
  },

  // getter for current logged in user
  current: function (req, res, next) {
    if(req.isAuthenticated()){

      // TODO change to join after waterline join suport is ready to use
      // if has a avatar get it after send
      if(req.user.avatarId  && !req.user.avatar){
        Images.findOneById(req.user.avatarId).done(function(err, image) {
          req.user.avatar = image;
          respond();
        });
      }else{
        respond();
      }


    }else{
      res.send({user: {}});
    }

    function respond(){
      res.send({user: req.user});
    }
  },

  getAvatar: function (req, res, next) {
    var id = req.param('id');

    if(id){
      Users.findOneById(id).done(function(err, user){
        if(err){
          sails.error(err);
          return res.send(500,{'error':err});
        }else if(user && user.avatarId){
          Images.findOneById(user.avatarId).done(function(err, image) {
            if (err) {
                console.log('Error on get image from BD: ',err );
                res.send(404);
            } else {

              // TODO change to image upload path
              var path = 'uploads/' + image.name;

              fs.readFile(path,function (err, contents) {

                if (err){
                  console.log(err);
                  return res.send(404);
                }else{
                  res.contentType('image/png');
                  res.send(contents);
                }

              });
            }
          });
        }else{
          return next();
        }
      });
    } else {
      return next();
    }
  },

  changeAvatar: function (req, res, next) {
    // TODO validate req.files.files
    var  avatarFile = req.files.files[0];

    Images.upload(avatarFile, function(err){
      if(err){
        res.send(
          {
            "files":[],
            "error": err
          }
        );
      } else {
        saveImage();
      }

    });

    function saveImage(){

      var uploadedFile = {};

      uploadedFile.name = avatarFile.newName;
      uploadedFile.originalFilename = avatarFile.originalFilename;
      uploadedFile.size = avatarFile.size;
      uploadedFile.extension = avatarFile.extension;

      // TODO check if are better get mime direct from file
      //uploadedFile.mime = req.files.files.headers['content-type'];
      uploadedFile.user_id = req.user.id;

      Images.create(uploadedFile).done(function(error, salvedFile) {
        if (error) {
          // TODO delete file if ocurs errror here
          console.log(error);
          res.send(500, {error: res.i18n("DB Error") });
        } else {
          //console.log('salved File:',salvedFile);
          salvedFile.thumbnailUrl = 'http://localhost:1333/images/avatars/user-avatar.png';
          salvedFile.url = 'http://localhost:1333/images/avatars/user-avatar.png';
          salvedFile.deleteUrl = '/files/' + salvedFile.id;
          salvedFile.deleteType = 'DELETE';
          console.log(salvedFile);
          saveAvatar(salvedFile);

        }
      });
    }

    function saveAvatar(salvedFile){
      // Lookup a user
      console.log('on user',req.user);
      req.user.avatarId = salvedFile.id;
      req.user.save( function(err) {
        if(err){
          return res.send(500, {err: res.i18n("Error on user avatar save") });
        }

        res.send({
          "user": req.user,
          "avatar": salvedFile
        });
      });
    }
  },

  forgotPasswordForm: function (req, res, next) {
    res.view();
  }
};

var validSignup = function(user, confirmPassword){
  var errors = [];

  if(!user.email){
    errors.push("Field <strong>email</strong> is required");
  }

  if(!user.password){
    errors.push("Field <strong>password</strong> is required");
  }

  if(!confirmPassword){
    errors.push("Field <strong>Confirm new password</strong> is required");
  }

  if(confirmPassword != user.password){
    errors.push("<strong>New password</strong> and <strong>Confirm new password</strong> are different");
  }

  return errors;
}
