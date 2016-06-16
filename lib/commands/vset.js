module.exports = function csetCommand (program, helpers) {
  /**
   * Set project variables in configs/configuration.json
   */
  program
  .command('vset <variable> <value>')
  .description('Set project variables in configs/configuration.json')
  .action( function run(variable, value) {
    var we = helpers.getWe()

    we.setConfig(variable, value, function (err) {
      if (err) throw err;

    })
  });
}