#!/usr/bin/env node

/**
 * List all routes in current project
 */

var path = require('path');
var requireAll = require('require-all');
var Table = require('cli-table');
var we;

module.exports = function run(program) {
  var projectFolder = process.cwd();
  we = require( path.resolve( projectFolder, 'node_modules/we-core' ));

  we.bootstrap(function(err, we) {
    if (err) return doneAll(err);

    we.pluginManager.getPluginsToUpdate(function (err, plugins) {
      // we.log.info(plugins.length +' plugins to update.');

      // instantiate
      var table = new Table({
        head: ['Method', 'Path'],
        colWidths: [10, 60]
      });

      // get route lists
      var routes = Object.keys(we.routes);
      // add each route
      for (var i = 0; i < routes.length; i++) {
        var route = routes[i].split(' ');

        if (route.length > 1) {
          table.push( [route[0], route[1]] );
        } else {
          table.push( ['all', route[0]] );
        }
      }

      // print the table
      console.log(table.toString());

      doneAll();
    });
  });
};

function doneAll(err) {
  if ( err ) we.log.error('Error:', err);
  we.exit(function(){ process.exit(); });
}