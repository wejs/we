/**
 * Load locales from plugins, merge in project and sort locale strings
 */
module.exports = function loadLocalesCommand(program) {

  const path = require('path'),
    helpers = require('../helpers'),
    async = require('async'),
    jsonfile = require('jsonfile');

  let we;

  program
  .command('loadLocales')
  .alias('ll')
  .description('Load locales from plugins, merge in project and sort locale strings')
  .action( function run() {
    const pluginLocales = {};

    let projectLocales = {},
      projectFolder = process.cwd(),
      projectLocalesFolder = path.resolve( projectFolder, 'config', 'locales');

    we = helpers.getWe();

    we.bootstrap( (err)=> {
      if (err) return doneAll(err);

      async.parallel([
        function loadPluginLocales(done) {
          async.each(we.pluginManager.pluginPaths, (p, next)=> {
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
              we.utils.mkdirp(projectLocalesFolder, (err)=> {
                if (err) return next(err);

                next();
              });
            } else {
              next(e);
            }
          }
        },
        function mergeLocales(done) {
          for (let n in pluginLocales) {
             we.utils._.defaultsDeep(projectLocales, pluginLocales[n]);
          }

          let localeNames = Object.keys(projectLocales);
          async.each(localeNames, (name, next)=> {
            let file = path.resolve(projectLocalesFolder, name+'.json');

            projectLocales[name] = sortLocale(projectLocales[name]);

            jsonfile.writeFile(file , projectLocales[name], {spaces: 2}, next);
          }, done);
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
      const sortedLocale = {};

      let keys = Object.keys(locale);
      let sortedKeys = we.utils._.sortBy(keys, (key)=> {
        return key;
      });

      we.utils._.each(sortedKeys, (key)=> {
       sortedLocale[key] = locale[key];
      });

      return sortedLocale;
    }
  });
};