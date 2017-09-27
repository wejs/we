/**
 * Script to update project plugins
 */
module.exports = function updateCommand(program, helpers) {

  let we;

  program
  .command('update')
  .description('Run plugin update functions in current project')
  .action(function run() {
    we = helpers.getWe({
      bootstrapMode: 'update'
    });

    we.bootstrap( (err, we)=> {
      if (err) return doneAll(err);

      we.pluginManager.getPluginsToUpdate( (err, plugins)=> {
        we.log.info(plugins.length +' plugins to update.');

        we.utils.async.eachSeries(plugins, (plugin, next)=> {
          we.pluginManager.runPluginUpdates(plugin.name, next);
        }, (err)=> {
          if (err) return doneAll(err);

          doneAll();
        });
      });
    });
  });

  function doneAll(err) {
    if ( err ) {
      we.log.error('Error:', err);
    } else {
      we.log.info('DONE All updates');
    }

    we.exit(process.exit);
  }
};
