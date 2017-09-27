/**
 * Run install and register plugin methods
 */
module.exports = function installRegisterCommand(program, helpers) {
  let log = console.log,
    logError = console.log;

  program
  .command('install:register')
  .alias('i:r')
  .option('--hide-log', 'Disable terminal log')
  .description('Run plugin install methods or registers for register all plugins in db')
  .action(function run (opts) {
    if (opts.hideLog) log = function(){};

      log('running: plugins install methods');

      let we = helpers.getWe({
        bootstrapMode: 'install'
      });

      we.bootstrap( (err)=> {
        if (err) {
          logError(err);
          process.exit();
          return;
        }

        we.exit( ()=> {
          log('done');
          process.exit();
        });
      });
  });
};