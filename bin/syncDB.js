#!/usr/bin/env node

/**
 * Sync database
 *
 */

var helpers = require('../lib/helpers');
var we;

module.exports = function run() {
  we = helpers.getWe();

  we.bootstrap({
    skipInstall: true
  }, function(err) {
    if (err) return doneAll(err);
    sync();
  });

  function sync() {
    we.db.defaultConnection.sync({force: true}).then(function(){
      doneAll();
    }).catch(doneAll);
  }

  function doneAll(err) {
    if ( err ) {
      we.log.error('Error on sync database', err);
    } else {
      we.log.info('Database sync done');
    }
    // end / exit
    process.exit();
  }
};