/**
 * Get one variable configuration form current we.js project
 */

module.exports = function vgetCommand(program, helpers) {

  const _ = require('lodash');
  let we;

  program
  .command('vget <variable>')
  .description('Get variable from we.js project')
  .action( function run (variable) {
    we = helpers.getWe();

    we.bootstrap( (err, we)=> {
      if (err) return doneAll(err);

      console.log(_.get(we.config, variable));

      doneAll();
    });

    function doneAll(err) {
      if ( err ) {
        we.log.error('Error on get variable:', err);
      }

      we.exit(process.exit);
    }
  });
};
