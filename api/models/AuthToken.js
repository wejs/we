/**
 * AuthToken
 *
 * @module      :: Model
 * @description :: Auth Token model for create login, password and activate account tokens
 *
 */
var uuid = require('node-uuid');

module.exports = {
  schema: true,
  attributes: {

    user_id: {
      type: 'string',
      required: true
    },

    token: {
      type: 'string'
    },

    isValid: {
      type: 'boolean',
      defaultsTo: true
    }
  },

  beforeCreate: function(token, next) {
    if(token.user_id){
      // before invalid all user old tokens
      AuthToken.invalidOldUserTokens(token.user_id, function(err, result){
        // generete new token
        token.token = uuid.v1();
        next();
      });
    }else{
      next();
    }
  },

  /**
   * Invalid old user tokens
   * @param  {string}   uid  user id to invalid all tokens
   * @param  {Function} next callback
   */
  invalidOldUserTokens: function(uid, next) {
    AuthToken.update({ user_id: uid }, { isValid : false })
    .exec(function(err,results){
      if(err){
        sails.log.error(err);
        return next(err);
      }
      next(null, results);
    });
  },


  /**
  * Check if a auth token is valid
  */
  validAuthToken: function (userId, token, cb) {

    // then get user token form db
    AuthToken.findOneByToken(token).exec(function(err, authToken) {
      if (err) {
        return cb('Error on get token', null);
      }

      // auth token found then check if is valid
      if(authToken){

        // user id how wons the auth token is invalid then return false
        if(authToken.user_id != userId || !authToken.isValid){
          return cb(null, false,{
            result: 'invalid',
            message: 'Invalid token'
          });
        }

        // TODO implement expiration time


        // set this auth token as used
        authToken.isValid = false;
        authToken.save(function(err){
          if (err) {
            return cb(res.i18n("DB Error"), false);
          }
          // authToken is valid
          return cb(null, true, authToken);
        });

      } else {
        // auth token not fount
        return cb('Auth token not found', false, null);
      }

    });
  }

};
