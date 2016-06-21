module.exports = function installRegisterCommand(program, helpers) {
  var log = console.log
  var logError = console.log

  program
  .command('install:register')
  .alias('i:r')
  .option('--hide-log', 'Disable terminal log')
  .description('Run plugin install methods or registers for register all plugins in db')
  .action(function run (opts) {
    if (opts.hideLog) log = function(){}

      log('running: plugins install methods')

      var we = helpers.getWe({
        bootstrapMode: 'install'
      });

      we.bootstrap(function (err) {
        if (err) {
          logError(err)
          process.exit()
          return;
        }

        we.exit(function(){
          log('done')
          process.exit()
        });
      })
  })
}