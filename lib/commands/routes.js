module.exports = function routesCommand(program) {
  /**
   * List all routes in current project
   */

  var Table = require('cli-table');
  var helpers = require('../helpers');
  var we;

  program
  .command('routes')
  .option('-m, --method [name]', 'Filter by method name: get, put, post, delete, options ...')
  .option('-c, --controller [name]', 'Filter by controller name')
  .option('-M, --model [name]', 'Filter by model name')
  .option('-f, --find [path]', 'Find route starting with [path]')
  .description('List all routes in current project')
  .action(function run(opts) {
    we = helpers.getWe();

    we.bootstrap(function(err, we) {
      if (err) return doneAll(err);


      var table = new Table({
        head: ['Method', 'Controller', 'Model', 'Path'],
        colWidths: [8,18, 15, 60]
      });


      // filter by controller name

      // get route lists
      var routes = Object.keys(we.routes);

      // filter by controller
      if (opts.controller && typeof opts.controller == 'string') {
        routes = routes.filter(function (r) {
          if (we.routes[r].controller == opts.controller) {
            return true;
          } else {
            return false;
          }
        });
      }

      // filter by controller
      if (opts.model && typeof opts.model == 'string') {
        routes = routes.filter(function (r) {
          if (we.routes[r].model == opts.model) {
            return true;
          } else {
            return false;
          }
        });
      }

      // filter by method
      if (opts.method && typeof opts.method == 'string') {
        // ensures that method is in lower case
        opts.method = opts.method.toLowerCase();
        routes = routes.filter(function (r) {
          if (r.indexOf(opts.method) === 0) {
            return true
          } else {
            return false;
          }
        });
      }
      var p, route;

      // add each route
      for (var i = 0; i < routes.length; i++) {
        route = routes[i].split(' ');
        p = ((route.length > 1)? route[1]: route[0]);

        // filter by path starting with [path]
        if (opts.find) {
          if (p.indexOf(opts.find) !== 0) {
            continue;
          }
        }

        table.push([
          (route.length > 1)? route[0]: 'all',
          we.routes[routes[i]].controller || ' ',
          we.routes[routes[i]].model || ' ',
          p
        ]);
      }

      // print the table
      console.log(table.toString());

      doneAll();
    });
  });

  function doneAll(err) {
    if ( err ) we.log.error('Error:', err);
    we.exit(function(){ process.exit(); });
  }
}

