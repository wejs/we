/**
 * Sync database
 */
module.exports = function syncDBCommand(program) {

  const helpers = require('../helpers');
  let we;

  program
  .command('syncDB')
  .description('Delete all models data and resync model tables')
  .action(function run() {
    we = helpers.getWe();

    we.bootstrap({
      skipInstall: true
    }, (err)=> {
      if (err) return doneAll(err);
      sync();
    });

    function sync() {
      we.db.defaultConnection.sync({force: true}).then(()=> {
        doneAll();
      })
      .catch(doneAll);
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
  });
};
