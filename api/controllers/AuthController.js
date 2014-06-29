// api/controllers/AuthController.js

var passport = require('passport');

module.exports = {

  index: function (req,res)	{
		res.redirect('/auth/register');
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
    user.displayName = req.param("displayName");
    user.username = req.param("username");
    user.email = req.param("email");
    user.password = req.param("password");
    user.language = req.param("language");


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

    if( ! _.isEmpty(errors) ){
      // error on data or confirm password
      return res.send('400',{
        "error": "E_VALIDATION",
        "status": 400,
        "summary": "Validation errors",
        "model": "User",
        "invalidAttributes": errors
      });
    }

    User.findOneByEmail(user.email).exec(function(err, usr){
      if (err) {
          sails.log.error('Error on find user by email.',err);
          return res.send(500, { error: res.i18n("Error") });
      } else if ( usr ) {
        return res.send(400,{
          "error": "E_VALIDATION",
          "status": 400,
          "summary": "The email address is already registered in the system",
          "model": "User",
          "invalidAttributes": {
            "email": [
              {
                "rule": "email",
                "message": "The email address is already registered in the system"
              }
            ]
          }
        });
      } else {
          User.create(user).exec(function(error, newUser) {
            if (error) {

              if(error.ValidationError){
                // wrong email format
                if(error.ValidationError.email){
                  return res.send(400,error);
                }

              }else {
                return res.send(500, {error: res.i18n("DB Error") });
              }
            } else {
              if(requireAccountActivation){
                var options = {};

                EmailService.sendAccontActivationEmail(newUser, req.baseUrl , function(err, responseStatus){
                  if(err) {
                    sails.log.error('Action:Login sendAccontActivationEmail:',err);
                    return res.serverError('Error on send activation email for new user',newUser);
                  }

                  res.send('201',{
                    success: [
                      {
                        status: '201',
                        message: res.i18n('Account created but is need an email validation\n, One email was send to %s with instructions to validate your account', newUser.email)
                      }
                    ]
                  });

                });
              } else {
                req.logIn(newUser, function(err){
                  if(err) return next(err);
                  res.send('201',newUser);
                });
              }
            }
        });
      }
    });

  },

  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },

  login: function (req, res, next) {
      var email = req.param("email");
      var password = req.param("password");

      if(!email || !password){
        return  res.forbidden('Password and email is required');
      }

      User.findOneByEmail(email).exec(function(err, usr) {
        if (err) {
          res.send(500, { error: res.i18n("DB Error") });
        } else {
          if(usr) {
            if (usr.verifyPassword(password)) {
              passport.authenticate('local', function(err, usr, info) {

                if (err){
                  return res.serverError(err);
                }
                if (!usr) return res.redirect('/login');

                req.logIn(usr, function(err){
                  if(err){
                    return res.serverError(err);
                  }

                  res.send(usr);
                  // TODO add suport to oauth tokens
                  //res.redirect('/');
                });

              })(req, res, next);

            } else {
              res.forbidden("Wrong Password");
            }
          } else {
            res.forbidden("User not found");
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

    token = req.param('token');

    console.log('user.id:', user.id);
    console.log('AuthToken:',token);

    var responseForbiden = function (){
		  return res.send(403, {
        responseMessage: {
          errors: [
            {
              type: 'authentication',
              message: res.i18n("Forbiden")
            }
          ]
        }
      });
    };

    var validAuthTokenRespose = function (err, result, authToken){
      if (err) {
        return res.send(500, { error: res.i18n("Error") });
      }

      // token is invalid
      if(!result){
        return responseForbiden();
      }

	    // token is valid then get user form db
	    User.findOneById(user.id).exec(function(err, usr) {
	      if (err) {
	        return res.send(500, { error: res.i18n("DB Error") });
	      }

	      // user found
	      if ( usr ) {

					// activate user and login
					usr.active = true;
					usr.save(function(err){
			      if (err) {
			        return res.send(500, { error: res.i18n("DB Error") });
			      }

					  // destroy auth token after use
					  authToken.destroy(function(err) {
				      if (err) {
				        return res.send(500, { error: res.i18n("DB Error") });
				      }

              req.logIn(usr, function(err){
                if(err) return next(err);

						    return res.format({
						     'text/html': function(){
						        // TODO add a activation message
						        //res.view( 'home/index.ejs');
						        //res.redirect('/user/:id/activation-success');
						        res.redirect('/');
						     },

						     'application/json': function(){
						        console.log('send result here ....');
						        res.send(200, usr);
						     }
						    });
              });

					  });

					});

	      } else {
	        // user not found
	        return responseForbiden();
	      }

	    });


    };

		validAuthToken(user.id, token, validAuthTokenRespose);



  },

  SendPasswordResetToken: function(req, res, next){
    console.log('TODO GetloginResetToken');
    return next();
  },

  forgotPasswordPage: function(req, res){
    // return home page and let emeberJs mount the page
    res.view("home/index.ejs");
  },

  forgotPassword: function(){
    console.log('TODO add a forgot password POST for send a new password to user');
  }

};


var validSignup = function(user, confirmPassword, res){
  var errors = {};

  if(!user.email){
    errors.email = [];
    errors.email.push({
      type: 'validation',
      field: 'email',
      rule: 'required',
      message: res.i18n("Field <strong>email</strong> is required")
    });
  }

  if(!user.password){
    errors.password = [];
    errors.password.push({
      type: 'validation',
      field: 'password',
      rule: 'required',
      message: res.i18n("Field <strong>password</strong> is required")
    });
  }

  if(!confirmPassword){
    errors.confirmPassword = [];
    errors.confirmPassword.push({
      type: 'validation',
      field: 'confirmPassword',
      rule: 'required',
      message: res.i18n("Field <strong>Confirm new password</strong> is required")
    });
  }

  if(confirmPassword != user.password){
    if(!errors.password) errors.password = [];
    errors.password.push({
      type: 'validation',
      field: 'password',
      rule: 'required',
      message: res.i18n("<strong>New password</strong> and <strong>Confirm new password</strong> are different")
    });
  }

  return errors;
};

/**
 * Check if a auth token is valid
 * TODO move thius function to AuthToken model
 */
var validAuthToken = function (userId, token, cb) {

  // then get user token form db
  AuthToken.findOneByToken(token).exec(function(err, authToken) {
    if (err) {
      return cb(res.i18n("DB Error"), null);
    }

    console.log(authToken);
    // auth token found then check if is valid
    if(authToken){

			// user id how wons the auth token is invalid then return false
			if(authToken.user_id != userId){
				return cb(null, false,{
					result: 'invalid',
					message: 'Token does not belong to this user'
				});
			}

			// TODO check token expiration time
			//
			//

			// authToken is valid
			return cb(null, true, authToken);

	  } else {
	    // auth token not fount
			return responseForbiden();
	  }

  });
};
