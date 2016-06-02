module.exports = function goCommand(program, helpers) {
  program
  .command('go')
  .option('-d, --dev', 'Run project in development enviroment mode *default')
  .option('-p, --prod', 'Run project in production enviroment mode')
  .description('Alias for "we run" command')
  .action(function run() {
    if (helpers.checkIfAreInProject()) {
      require(process.cwd());
    } else {
      helpers.notInProjectError();
    }
  });
}
