// api/controllers/AuthController.js

var passport = require('passport');

module.exports = {

  index: function (req,res)	{
		res.redirect('/signup');
	},

	// Signup method GET function
  signupPage: function (req, res) {
    // return index page and let angular.js construct the page
    res.view('home/index');
  },

  // Signup method POST function
  signup: function (req, res, next) {
    var requireAccountActivation = false;
    var user = {};
    user.name = req.param("name");
    user.email = req.param("email");
    user.password = req.param("password");

    if( !sails.util.isUndefined(sails.config.site) )
      if( !sails.util.isUndefined( sails.config.site.requireAccountActivation ) ){
        requireAccountActivation = sails.config.site.requireAccountActivation;
      }

    // if dont need a account activation email then create a active user
    if(!requireAccountActivation)
      user.active = true;

    var confirmPassword = req.param("confirmPassword");
    var errors;

    errors = validSignup(user, confirmPassword, res);

    if( errors.length >0 ){
      // error on data or confirm password
      res.send('400',{
        responseMessage: {
          errors: errors
        }
      });
    } else {

      Users.findOneByEmail(user.email).done(function(err, usr){
        if (err) {
            return res.send(500, { error: res.i18n("DB Error") });
        } else if ( usr ) {
            return res.send(403, {
              responseMessage: {
                errors: [
                  {
                    field: 'email',
                    type: 'validation',
                    message: res.i18n("Email already Taken")
                  }
                ]
              }
            });
        } else {
            Users.create(user).done(function(error, newUser) {
              if (error) {

                if(error.ValidationError){

                  // wrong email format
                  if(error.ValidationError.email){

                    var errors = [];
                    var errorsLength = error.ValidationError.email.length;
                    errorsLength--;

                    error.ValidationError.email.forEach( function(err, index){

                      err.field = 'email';
                      err['type'] = 'validation';
                      err.message = res.i18n(err.message);
                      errors.push(err);

                      if( errorsLength === index){
                        return res.send(403,{
                          responseMessage: {
                            errors: errors
                          }
                        });
                      }
                    });

                  }

                }else {
                  return res.send(500, {error: res.i18n("DB Error") });
                }



              } else {

                if(requireAccountActivation){
                  var options = {};

                  EmailService.sendAccontActivationEmail(newUser, req.baseUrl , function(err, responseStatus){
                    if(err) return next(err);

                    res.send('201',{
                      responseMessage: {
                        success: [
                          {
                            message: res.i18n('Account created but is need an email validation\n, One email was send to %s with instructions to validate your account', newUser.email)
                          }
                        ]
                      }
                    });

                  });
                } else {
                  // TODO add suporte do configure user registration activation
                  // like with email confirmation or auto login
                  req.logIn(newUser, function(err){
                    if(err) return next(err);

                    res.send('201',{
                      user: newUser,
                      responseMessage: {
                        success: [
                          {
                            message: res.i18n('User successfully registered')
                          }
                        ]
                      }
                    });

                  });


                }
              }
          });
        }
      });
    }
  },

  logout: function (req, res) {
    req.logout();
    res.redirect('/');
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

                      })(req, res, next);

                  } else {
                      res.send(400, { error: res.i18n("Wrong Password") });
                  }
              } else {
                  res.send(404, { error: res.i18n("User not Found") });
              }
          }
      });
  },

  /**
   * Activate a user account with activation code
   */
  activate: function(req, res){
    console.log('Check token');
    console.log('activate Account');
    user = {};
    user.id = req.param('id');

    AuthToken = req.param('token');

    console.log('user.id:', user.id);
    console.log('AuthToken:',AuthToken);

    res.format({
     'text/html': function(){
       //res.view( 'home/index.ejs');
        console.log('send result here ....');
        res.send({});//
     },

     'application/json': function(){
        console.log('send result here ....');
        res.send({});
     }
    });
  },

  SendPasswordResetToken: function(req, res, next){
    console.log('TODO GetloginResetToken');
    return next();
  }

};


var validSignup = function(user, confirmPassword, res){
  var errors = [];

  if(!user.email){
    errors.push({
      type: 'validation',
      field: 'email',
      message: res.i18n("Field <strong>email</strong> is required")
    });
  }

  if(!user.password){
    errors.push({
      type: 'validation',
      field: 'password',
      message: res.i18n("Field <strong>password</strong> is required")
    });
  }

  if(!confirmPassword){
    errors.push({
      type: 'validation',
      field: 'confirmPassword',
      message: res.i18n("Field <strong>Confirm new password</strong> is required")
    });
  }

  if(confirmPassword != user.password){
    errors.push({
      type: 'validation',
      field: 'password',
      message: res.i18n("<strong>New password</strong> and <strong>Confirm new password</strong> are different")
    });
  }

  return errors;
};
