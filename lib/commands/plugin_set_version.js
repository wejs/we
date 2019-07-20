/**
 * Update plugin version
 */
module.exports = function pluginSetVersionCommand (program, helpers) {

  program
  .command('plugin-set-version <pluginName> <version>')
  .alias('pluginSV')
  .description('Set plugin version in format 0.0.0, usefull for plugin development')
  .action( function run(pluginName, version) {
    const we = helpers.getWe();

    we.bootstrap( (err, we)=> {
      if (err) return doneAll(err);

      if (!we.plugins[pluginName]) {
        we.log.warn('Plugin not found');
        return doneAll();
      }

      we.db.models.plugin.update({
        version: version
      }, {
        where: {
          name: pluginName
        }
      })
      .then( ()=> {
        we.log.verbose('Plugin updated');
        doneAll();
      })
      .catch((err)=> {
        doneAll(err);
      });
    });

    function doneAll(err) {
      if ( err ) {
        we.log.error('Error on get variable:', err);
      }

      we.exit(process.exit);
    }
  });
};