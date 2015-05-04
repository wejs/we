var path = require('path');

module.exports = function run() {

  var projectFolder = process.cwd();
  var we = require( path.resolve( projectFolder, 'node_modules/we-core' ));

  we.bootstrap(function(err, we) {
    if (err) return doneAll(err);

    var dbC = we.db.loadDatabaseConfig( projectFolder );
    var configs = dbC[we.env];

    if (configs.database) {
      we.db.defaultConnection.query('USE '+ configs.database +'; DROP DATABASE ' + configs.database)
      .spread(function(results, metadata) {
        we.db.defaultConnection.query('CREATE DATABASE ' + configs.database)
        .spread(function(results, metadata) {
          sync();
        });
      }).catch(function(){
        // if return error, try to delete all tables with sync
        we.db.defaultConnection.sync({force: true}).done(doneAll);
      });
    } else {
      we.db.defaultConnection.sync({force: true}).done(doneAll);
    }
  });

  function sync() {
    we.db.defaultConnection.sync().done(doneAll);
  }

  function doneAll(err) {
    if ( err ) {
      we.log.error('Error on reset database', err);
    } else {
      we.log.info('Database reset done', err);
    }
    //sails.load();
    // end / exit
    process.exit();
  }
};