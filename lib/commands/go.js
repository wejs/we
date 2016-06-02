module.exports = function goCommand(program) {
  program
  .command('go')
  .option('-d, --dev', 'Run project in development enviroment mode *default')
  .option('-p, --prod', 'Run project in production enviroment mode')
  .description('Alias for "we run" command')
  .action(require('./run.js'));
}
