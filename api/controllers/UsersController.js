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

    Users.find({})
    .limit(10)
    .sort('name ASC')
    .exec(function(err, users) {

      // Error handling
      if (err) {
        return console.log(err);

      // Found multiple users!
      } else {
        res.format({
           'text/html': function(){
            // TODO add suport to html requests
              res.view("home/index.ejs");
            /*
             res.view({
                users: users
              });
            */
           },

           'application/json': function(){
             res.send(users);
           }
        });
      }
    });
  },

  find: function(req, res){
    var id = req.param('id');

    Users.findOneById(id)
    .exec(function(err, user){
      // add suport for json errror and warning messages in wejs message format
      if (err) {
        console.error('Error on find user: ',err);
        return res.serverError('Error on find user.')
      }

      if(!user){
        return res.notFound('User not found.');
      }

      res.send({
        item: user
      });
    });

  },

  create: function (){

  },

  update: function(req, res, next) {
    sails.log('update');
    sails.log(req.params);

    next();
  },

  // getter for current logged in user
  current: function (req, res, next) {
    if(req.isAuthenticated && req.isAuthenticated() ){

      // TODO change to join after waterline join suport is ready to use
      // if has a avatar get it after send
      if(req.user.avatarId  && !req.user.avatar){
        Images.findOneById(req.user.avatarId).exec(function(err, image) {
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
      Users.findOneById(id).exec(function(err, user){
        if(err){
          sails.error(err);
          return res.send(500,{'error':err});
        }else if(user && user.avatarId){
          Images.findOneById(user.avatarId).exec(function(err, image) {
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
    var  avatarFile = req.files.file;

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

      Images.create(uploadedFile).exec(function(error, salvedFile) {
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
