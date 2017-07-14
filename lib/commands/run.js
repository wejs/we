/**
 * Run one we.js project
 */
module.exports = function runCommand(program) {


  let helpers = require('../helpers');

  program
  .command('run')
  .alias('go')
  // .alias('js')
  .option('-d, --dev', 'Run project in development enviroment mode *default')
  .option('-p, --prod', 'Run project in production enviroment mode')
  .description('Run the we.js project in current folder')
  .action(run);

  program
  .command('js')
  .option('-d, --dev', 'Run project in development enviroment mode *default')
  .option('-p, --prod', 'Run project in production enviroment mode')
  .description('Alias for "we run" command')
  .action(run);

  function run() {
    if (helpers.checkIfAreInProject()) {
      require(process.cwd());
    } else {
      helpers.notInProjectError();
    }
  }
};