/**
 * AuthController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var weOauth2 = require('we-oauth2');

module.exports = {
  oauth2Callback: function(req, res){
    weOauth2.consumer.validAndLoadAccessTokenMW(req, res,function() {
      // token is invalid or not found
      sails.log.warn('locando',sails.config.wejs.providers.accounts, req.accessTokenError);
      sails.log.warn('req.accessToken',req.accessToken);

      if(!req.accessToken){
        // TODO add a better forbiden redirect to invalid tokens
        return res.redirect('/');
      }

      var redirectSubUrl = req.param('redirectTo');
      if(redirectSubUrl){
        res.redirect('/' + redirectSubUrl);
      }
      sails.log.warn('locando')
      res.redirect('/');
    });
  }
};