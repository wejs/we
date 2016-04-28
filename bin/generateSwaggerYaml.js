#!/usr/bin/env node

/**
 * List all routes in current project
 */

var helpers = require('../lib/helpers');
var YAML = require('json2yaml');
var acquit = require('acquit');
var mime = require('mime');
var fs = require('fs');
var we, methods = ['get', 'post', 'put', 'delete'];

module.exports = function run(opts) {
  we = helpers.getWe();

  we.bootstrap(function (err, we) {
    if (err) return doneAll(err);

    we.pluginManager.getPluginsToUpdate(function (err) {
      if (err) return doneAll(err);

      var jsonFile = {
        swagger: '2.0',
        info: {
          version: '0.0.1', // todo get from package.json
          title: we.config.appName
        },
        host: we.config.hostname.replace('http://','').replace('https://', ''),
        basePath: '/',
        schemes: [ 'http', 'https' ],
        consumes: ['application/json'],
        produces: we.config.responseTypes.map(function(t){
          return mime.lookup(t);
        }),

        paths: {},
        definitions: {}
      };

      // get route lists
      var routes = Object.keys(we.routes);
      var route, p, method;

      for (var i = 0; i < routes.length; i++) {

        route = routes[i].split(' ');
        p = ((route.length > 1)? route[1]: route[0]);

        // filter by path starting with [path]
        if (opts.find) {
          if (p.indexOf(opts.find) !== 0) {
            continue;
          }
        }

        if (p.indexOf('/admin') === 0) continue; // skip admin pages

        if (!jsonFile.paths[p]) jsonFile.paths[p] = {};

        if (methods.indexOf(route[0]) > -1) {
          method = route[0];
        } else {
          method = 'get';
        }

        var name = method+ '_' + we.routes[routes[i]].controller + '_' +we.routes[routes[i]].action;

        if (we.routes[routes[i]].parent) {
          name = we.routes[routes[i]].parent+ '_' + name;
        }

        if (we.routes[routes[i]].name) {
          name = we.routes[routes[i]].name+ '_' + name;
        }

        name = method +'::' + p

        // console.log('>>', we.routes[routes[i]])

        jsonFile.paths[p][method] = {
          operationId: name,
          responses: {}
        };

        switch(method) {
          case 'post':
            jsonFile.paths[p][method].responses = {
              '201': {
                description: 'Success'
              },
              'default': {
                description: 'Success'
              }
            };
            break;
          case 'put':
            jsonFile.paths[p][method].responses = {
              '200': {
                description: 'Success'
              },
              'default': {
                description: 'Success'
              }
            };
            break;
          case 'delete':
            jsonFile.paths[p][method].responses = {
              '204': {
                description: 'Success'
              },
              'default': {
                description: 'Success'
              }
            };
            break;
          default:
            // get
            jsonFile.paths[p][method].responses = {
              '200': {
                description: 'Success'
              },
              'default': {
                description: 'Success'
              }
            };
        }

        jsonFile.paths['/swagger'] = { 'x-swagger-pipe': 'swagger_raw' };

        // table.push([
        //   (route.length > 1)? route[0]: 'all',
        //   we.routes[routes[i]].controller || ' ',
        //   we.routes[routes[i]].model || ' ',
        //   p
        // ]);
      }

      var ymlText = YAML.stringify(jsonFile);

      var filePath = we.projectPath + '/api/swagger/swagger.yaml';


      fs.writeFile(filePath, ymlText, function(err) {
        if (err) {
          return doneAll(err);
        }

        doneAll();
      });

    });
  });
};

function doneAll(err) {
  if ( err ) we.log.error('Error:', err);
  we.exit(function(){ process.exit(); });
}