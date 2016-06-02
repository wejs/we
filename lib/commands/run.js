module.exports = function runCommand(program) {
  /**
   * Run one we.js project
   */

  var helpers = require('../helpers');

  program
  .command('run')
  .command('go')
  .option('-d, --dev', 'Run project in development enviroment mode *default')
  .option('-p, --prod', 'Run project in production enviroment mode')
  .description('Run the we.js project in current folder')
  .action(function run() {
    if (helpers.checkIfAreInProject()) {
      require(process.cwd());
    } else {
      helpers.notInProjectError();
    }
  });
}