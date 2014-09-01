/**
 * AuthController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var weOauth2 = require('we-oauth2');

module.exports = {
  oauth2Callback: function(req, res){
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

  }
};