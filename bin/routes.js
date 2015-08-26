#!/usr/bin/env node

/**
 * List all routes in current project
 */

var Table = require('cli-table');
var helpers = require('../lib/helpers');
var we;

module.exports = function run() {
  we = helpers.getWe();

  we.bootstrap(function(err, we) {
    if (err) return doneAll(err);

    we.pluginManager.getPluginsToUpdate(function (err) {
      if (err) return doneAll(err);

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