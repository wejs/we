#!/usr/bin/env node

/**
 * Set user as admin with user id
 *
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
      // check if the role exists
      we.db.models.role.find({ where:
        { name: 'administrator' }
      }).then(function (role) {
        if (!role) return doneAll('administrator role not found');
        user.addRole(role).then(function() {
          we.log.info('DONE role ' +role.name+ ' set to user ' +user.username);
          return doneAll();
        });
      });
    });
  });

  function doneAll(err) {
    if ( err ) {
      we.log.error('Error on set user as admin', err);
    }
    // end / exit
    we.exit(function () { process.exit(); });
  }
};