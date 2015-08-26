#!/usr/bin/env node

/**
 * Script to update project plugins
 */
var helpers = require('../lib/helpers');
var we;

module.exports = function run() {
  we = helpers.getWe();

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