var path = require('path');

module.exports = function run() {

  var projectFolder = process.cwd();
  var we = require( path.resolve( projectFolder, 'node_modules/we-core' ));

  we.bootstrap({database: { resetAllData: true }} , function(err, we) {
    if (err) return doneAll(err);

    var dbC = we.db.loadDatabaseConfig( projectFolder );
    var configs = dbC[we.env];

    sync();
  });

  function sync() {
    we.db.defaultConnection.sync({force: true}).then(doneAll);
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