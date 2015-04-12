var path = require('path');

module.exports = function run() {

  var projectFolder = process.cwd();
  var we = require( path.resolve( projectFolder, 'node_modules/we-core' ));

  we.bootstrap(function(err, we) {
    if (err) return doneAll(err);

    we.db.defaultConnection.sync({force: true})
    .done(doneAll);
  });

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