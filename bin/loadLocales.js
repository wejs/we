/**
 * Load locales from plugins, merge in project and sort locale strings
 */

var path = require('path');
var requireAll = require('require-all');
var async = require('async');
var jsonfile = require('jsonfile');
var sget = require('sget');
var fs = require('fs');
var we;

module.exports = function run(program) {
  var pluginLocales = {};
  var projectLocales = {};

  var projectFolder = process.cwd();
  var projectLocalesFolder = path.resolve( projectFolder, 'config', 'locales');

  we = require( path.resolve( projectFolder, 'node_modules', 'we-core' ));

  we.bootstrap(function (err) {
    if (err) return doneAll(err);

    async.parallel([
      function loadPluginLocales(done) {
        async.each(we.pluginManager.pluginPaths, function (p, next) {
          try {
            pluginLocales[p] = require('require-all')({
              dirname     :  path.resolve(p ,'locales'),
              filter      :  /(.+)\.json$/,
            });
            next();
          } catch(e) {
            if (e.code == 'ENOENT') {
              next();
            } else {
              next(e);
            }
          }
        }, done);
      },
      function createAndLoadProjectLocales(next) {
        try {
          projectLocales = require('require-all')({
            dirname     :  projectLocalesFolder,
            filter      :  /(.+)\.json$/,
          });
          next();
        } catch(e) {
          if (e.code == 'ENOENT') {
            we.log.info(
              'Project locale folder not found, then i will create it in:',
              projectLocalesFolder
            );
            // create the folder if not exists
            mkdirp(projectLocalesFolder, function (err) {
              if (err) return next(err);

              next();
            });
          } else {
            next(e);
          }
        }
      },
      function mergeLocales(done) {
        for (var n in pluginLocales) {
           we.utils._.defaultsDeep(projectLocales, pluginLocales[n]);
        }

        var localeNames = Object.keys(projectLocales);
        async.each(localeNames, function (name, next) {
          var file = path.resolve(projectLocalesFolder, name+'.json');

          jsonfile.writeFile(file , projectLocales[name], {spaces: 2}, next);
        }, doneAll);
      }
    ], doneAll);
  });

  function doneAll(err) {
    if ( err ) {
      we.log.error('Error on loadLocales:', err);
    } else {
      we.log.info('DONE');
    }
    // end / exit
    process.exit();
  }

  function sortLocale(locale) {
    var sortedLocale = {};

    var keys = Object.keys(locale);
    var sortedKeys = we.utils._.sortBy(keys, function (key){
      return key;
    });

    we.utils._.each(sortedKeys, function (key) {
     sortedLocale[key] = locale[key];
    });

    return sortedLocale;
  }
};
