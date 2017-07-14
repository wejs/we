/**
 * Set project variables in configs/configuration.json
 */
module.exports = function csetCommand (program, helpers) {

  program
  .command('vset <variable> <value>')
  .description('Set project variables in configs/configuration.json')
  .action( function run(variable, value) {
    const we = helpers.getWe();

    we.setConfig(variable, value, (err)=> {
      if (err) throw err;
    });
  });
};