/**
 * Script to update project plugins
 */
var path = require('path');
var requireAll = require('require-all');
var sget = require('sget');
var we;

module.exports = function run(program) {

  var projectFolder = process.cwd();
  we = require( path.resolve( projectFolder, 'node_modules/we-core' ));

  we.bootstrap(function(err, we) {
    if (err) return doneAll(err);

    we.pluginManager.getPluginsToUpdate(function (err, plugins) {
      we.log.info(plugins.length +' plugins to update.');

      we.utils.async.eachSeries(plugins, function (plugin, next) {
        we.pluginManager.runPluginUpdates(plugin.name, next);
      }, function (err) {
        if (err) return doneAll(err);

        doneAll();
      });
    });
  });
};

function doneAll(err) {
  if ( err ) {
    we.log.error('Error:', err);
  } else {
    we.log.info('DONE All updates');
  }

  we.exit(function(){
    process.exit();
  });
}