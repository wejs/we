/**
 * Drop project database
 */
module.exports = function dropDBCommand(program) {

  const helpers = require('../helpers');
  let we;

  program
  .command('dropDB')
  .description('Drop project database')
  .action( function run() {
    we = helpers.getWe();

    we.bootstrap({
      skipInstall: true
    }, (err)=> {
      if (err) return doneAll(err);
      drop();
    });

    function drop() {
      we.db.defaultConnection.queryInterface
      .dropAllTables()
      .nodeify(doneAll);

      // // old dropdb
      // var database = we.db.defaultConnection.config.database;
      // we.db.defaultConnection.transaction(function (t) {
      //   var options = { raw: true, transaction: t }
      //   return we.db.defaultConnection
      //   .query('SET FOREIGN_KEY_CHECKS = 0', options)
      //   .then(function(){
      //     return we.db.defaultConnection.query('DROP DATABASE '+database, options)
      //   })
      //   .then(function() {
      //     return we.db.defaultConnection.query('CREATE DATABASE '+database, options)
      //   })
      //   .then(function() {
      //     return we.db.defaultConnection.query('SET FOREIGN_KEY_CHECKS = 1', options)
      //   });
      // }).then(function(){ doneAll(); })
      // .catch(doneAll);
    }

    function doneAll(err) {
      if ( err ) {
        we.log.error('Error on drop database', err);
      } else {
        we.log.info('Database drop done');
      }
      // end / exit
      process.exit();
    }
  });
};
