#!/usr/bin/env node

/**
 * Reset project database
 *
 */

var helpers = require('../lib/helpers');
var we;

module.exports = function run() {
  we = helpers.getWe();
  var projectFolder = process.cwd();

  we.bootstrap({database: { resetAllData: true }} , function(err, we) {
    if (err) return doneAll(err);

    var dbC = we.db.loadDatabaseConfig( projectFolder );
    var configs = dbC[we.env];

    sync();
  });

  function sync() {
    we.db.defaultConnection.sync({force: true}).then(function(){
      doneAll();
    }).catch(doneAll);
  }

  function doneAll(err) {
    if ( err ) {
      we.log.error('Error on reset database', err);
    } else {
      we.log.info('Database reset done');
    }
    // end / exit
    process.exit();
  }
};