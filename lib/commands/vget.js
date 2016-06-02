module.exports = function vgetCommand(program, helpers) {
  /**
   * Get one variable configuration form current we.js project
   */

  var _ = require('lodash');
  var we;

  program
  .command('vget <variable>')
  .description('Get variable configuration from we.js project')
  .action( function run(variable) {
    we = helpers.getWe();
    we.bootstrap(function (err, we) {
      if (err) return doneAll(err);

      console.log(_.get(we.config, variable));

      doneAll();
    });

    function doneAll(err) {
      if ( err ) {
        we.log.error('Error on get variable:', err);
      }

      we.exit(function () {
        // end / exit
        process.exit();
      });
    }
  });
}
