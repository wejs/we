/**
 * Unset project variables in configs/configuration.json
 */
module.exports = function vDelCommand (program, helpers) {

  program
  .command('vdel <variable>')
  .description('Unset / delete one variable from configs/configuration.json')
  .action( function run (variable) {
    const we = helpers.getWe();

    we.unSetConfig(variable, (err)=> {
      if (err) throw err;
    });
  });
};