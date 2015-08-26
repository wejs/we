#!/usr/bin/env node

/**
 * Get one time login link for one user by user id
 */

var helpers = require('../lib/helpers');
var we;

module.exports = function run() {
  we = helpers.getWe();

  we.bootstrap(function(err, we) {
    if (err) return doneAll(err);

    var uid = process.argv[3];
    if (! Number(uid) ) return doneAll('Invalid Uid');

    we.db.models.user.findById(uid)
    .then( function (user) {
      we.db.models.authtoken.create({
        'userId': user.id,
        tokenType: 'resetPassword'
      }).then(function (token) {
        if (!token) {
          return doneAll('unknow error on create auth token');
        }

        we.log.info('resetUrl>>', token.getResetUrl());
        open(token.getResetUrl());
        return doneAll();
      });
    });
  });

  function doneAll(err) {
    if ( err ) {
      we.log.error('Error on set user as admin', err);
    }
    // end / exit
    process.exit();
  }
};