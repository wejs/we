module.exports = function vDelCommand (program, helpers) {
  /**
   * Unset project variables in configs/configuration.json
   */
  program
  .command('vdel <variable>')
  .description('Unset / delete one variable from configs/configuration.json')
  .action( function run (variable) {
    var we = helpers.getWe()

    we.unSetConfig(variable, function (err) {
      if (err) throw err;

    })
  });
}