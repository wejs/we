/**
 * install one plugin in current project
 */
module.exports = function installCommand(program, helpers) {

  const path = require('path'),
    fs = require('fs'),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    async = require('async');

  let installedDeps = {},
    // plugin vars for manage this install
    alreadyCheckedDependencies = {},
    pluginsToInstall = {},
    pluginsInstalled = {},
    addedInDepenencies = [],
    log = console.log,
    logError = console.log,
    verboseLog = function() {},
    packageJSONPath = path.resolve(process.cwd(), 'package.json'),
    projectPackageJSON;

  program
  .command('install [pluginNames...]')
  .alias('i')
  .option('--dev', 'Install one plugin only for development or test enviroments')
  .option('--skip-npm-install', 'Skip npm install command')
  .option('--skip-wejs-install', 'Skip We.js plugin install mathods')
  .option('--hide-log', 'Disable terminal log')
  .option('--production', 'Run npm i --production in npm install step for production enviroments')
  .description('Install plugins in current project and run plugin install methods')
  .action(function run (pluginNames, opts) {

    projectPackageJSON = require(packageJSONPath);

    pluginNames.forEach( (n)=> {
      alreadyCheckedDependencies[n] = false;
    });

    async.series([
      function (done) {
        if (!projectPackageJSON.wejs) projectPackageJSON.wejs = {};
        if (!projectPackageJSON.wejs.plugins) projectPackageJSON.wejs.plugins = {};
        if (!projectPackageJSON.wejs.devPlugins) projectPackageJSON.wejs.devPlugins = {};

        installedDeps = projectPackageJSON.wejs.plugins;

        let iNames = Object.keys(installedDeps).join(' ');
        if (iNames && iNames.length) {
          verboseLog('installed dependencies: '+iNames);
        }

        done();
      },
      function (done) {
        buildDependencies (opts, done);
      },

      function (done) {
        if (addedInDepenencies.length) {
          log('added in package.json.dependencies: ' + addedInDepenencies.join(' '));
        }

        done();
      },

      function addPluginsInPPackageJSON (done) {
        const names = [];
        let plugins;

        if (opts.dev) {
          plugins = projectPackageJSON.wejs.devPlugins;
        } else {
          plugins = projectPackageJSON.wejs.plugins;
        }

        Object.keys(pluginsToInstall).forEach( (n)=> {
          if (plugins[n]) return;

          names.push(n);
          if (opts.dev) {
            plugins[n] = true;
          } else {
            plugins[n] = true;
          }
        });

        if (names && names.length) {
          log(names.join(' ')+' added in package.json.wejs.plugins');
        }
        // update the package.json
        savePackageJSON(projectPackageJSON, done);
      },

      function runNPMInstallAll (done) {
        if (opts.skipNpmInstall) return done();
        installAll([], opts, done);
      },

      function runInstallMethodsIfNeed (done) {
        if (opts.skipWejsInstall) return done();

        log('running: plugins install methods');

        let we = helpers.getWe({
          bootstrapMode: 'install'
        });

        we.bootstrap( (err)=> {
          if (err) return done(err);
          we.exit(done);
        });
      }
    ], (err)=> {
      if (err) {
        logError(err);
        return;
      }

      log('done');

      process.exit();
    });
  });

  function buildDependencies (opts, cb) {
    let name;
    // get one for check deps
    for (let n in alreadyCheckedDependencies) {
      if (!alreadyCheckedDependencies[n] && !installedDeps[n]) {
        name = n;
        break;
      }
    }

    verboseLog('check:', name,  Object.keys(alreadyCheckedDependencies));

    // done all
    if (!name) return cb();

    getPackageJSONFromNpm (name, (err, pkg)=> {
      if (err) return cb(err);

      // checked, set flag before check to skip conflic problems
      alreadyCheckedDependencies[name] = pkg;

      if (opts.dev) {
        if (!projectPackageJSON.devDependencies[name]) {
          addedInDepenencies.push(name);
          projectPackageJSON.devDependencies[name] = '^'+pkg.versions[pkg.versions.length-1];
        }
      } else {
        if (!projectPackageJSON.dependencies[name]) {
          addedInDepenencies.push(name);
          projectPackageJSON.dependencies[name] = '^'+pkg.versions[pkg.versions.length-1];
        }
      }

      if (isPlugin(pkg)) {

        pluginsToInstall[name] = pkg;

        if (pkg.wejs && pkg.wejs.dependencies) {
          // have deps
          for (let n in pkg.wejs.dependencies) {
            // is installed
            if (installedDeps[n]) {
              alreadyCheckedDependencies[n] = installedDeps[n];
              break;
            }
            // if not is in check list or not is installed
            if (!alreadyCheckedDependencies[n]) {
              // quene for check deps
              alreadyCheckedDependencies[n] = false;
            }
          }
        }
      }

      // run check again for check other module ...
      buildDependencies(opts, cb);
    });
  }

  function installAll (names, opts, cb) {
    installModules (names, opts, cb);
  }

  function getPackageJSONFromNpm (name, cb) {
    exec('npm view --json '+name, (err, stdout)=> {
      if (err) return cb(err);
      cb(null, JSON.parse(stdout));
    });
  }

  function savePackageJSON (data, cb) {
    fs.writeFile(
      packageJSONPath,
      JSON.stringify(data, null, 2),
      {
        flags: 'w'
      },
      function (err) {
        if (err) return cb(err);

        cb(null);
      }
    );
  }

  function installModules (names, opts, cb) {
    let err = '',
      copts = [ 'install' ];

    if (names && names.length) {
      copts.push('--save');
      log('running: npm install --save '+names.join(' '));
    } else {
      log('running: npm install '+names.join(' '));
    }

    if (opts.production) {
      copts.push('--production');
    }

    const cm = spawn('npm', copts.concat(names), {
      detached: true,
    });

    cm.stderr.on('data', (data)=> {
      err += String(data);
    });

    cm.on('exit', (code)=> {
      if (code !== 0) {
        cb(err);
      } else {
        names.forEach( (n)=> {
          pluginsInstalled[n] = true;
        });

        if (names.length) {
          log('npm module(s) '+names.join(' ')+' installed');
        }
        cb();
      }
    });
  }

  function isPlugin (pkg) {
    if (pkg.keywords && (pkg.keywords.indexOf('wejs-plugin') >-1) ) {
      return true;
    } else {
      return false;
    }
  }
};
