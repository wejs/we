/**
 * Run all we.js plugins and project cron tasks
 */
module.exports = function cronCommand(program) {

  const helpers = require('../helpers');
  let we;

  program
  .command('cron')
  .description('Run project and plugin cron tasks')
  .action(function run() {
    we = helpers.getWe();

    we.bootstrap( (err)=> {
      if (err) return doneAll(err);
      we.runCron(doneAll);
    });

    function doneAll(err) {
      if (err) {
        we.log.error('Error on run we.js cron tasks:', err);
      }
      // end / exit
      we.exit(process.exit);
    }
  });
};
