/**
 * AuthController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var weOauth2 = require('we-oauth2');

module.exports = {

  /**
   * Receive one oauth token from provider and logIn related user
   *
   * @param  {object} req express request
   * @param  {object} res express response
   */
  oauth2Callback: function(req, res) {
    weOauth2.consumer.receiveToken(req, res, function() {
      if(!req.accessToken) {
        // TODO add a better forbiden redirect to invalid tokens
        return res.redirect('/');
      }

      // logIn user
      weOauth2.logIn(req.accessToken, req, res);

      var redirectSubUrl = req.param('redirectTo');
      if(redirectSubUrl){
        res.redirect('/' + redirectSubUrl);
      }

      res.redirect('/');
    })
  },

  /**
   * Log out user and redirect to home
   */
  logOut: function(req, res){
    weOauth2.logOut(req, res, function() {
      sails.log.warn(req.session);
      res.redirect('/');
    });
  }
};