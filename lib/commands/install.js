module.exports = function installCommand(program, helpers) {
  var path = require('path')
  var fs = require('fs')
  var spawn = require('child_process').spawn
  var exec = require('child_process').exec
  var async = require('async')
  var packageJSONPath = path.resolve(process.cwd(), 'package.json')
  var projectPackageJSON;
  var log = console.log
  var logError = console.log
  var verboseLog = function() {}
  // plugin vars for manage this install
  var installedDeps = {}
  var alreadyCheckedDependencies = {}
  var pluginsToInstall = {}
  var pluginsInstalled = {}

  program
  .command('install [pluginNames...]')
  .alias('i')
  .option('--skip-install', 'Skip npm install command')
  .option('--hide-log', 'Disable terminal log')
  .description('Install plugins in current project and run plugin install methods')
  .action(function run (pluginNames, opts) {

    projectPackageJSON = require(packageJSONPath)


    pluginNames.forEach(function(n) {
      alreadyCheckedDependencies[n] = false
    })

    async.series([
      function (done) {
        if (!projectPackageJSON.wejs) projectPackageJSON.wejs = {}
        if (!projectPackageJSON.wejs.plugins) projectPackageJSON.wejs.plugins = {}

        installedDeps = projectPackageJSON.wejs.plugins

        var iNames = Object.keys(installedDeps).join(' ');
        if (iNames && iNames.length) {
          verboseLog('installed dependencies: '+iNames)
        }

        done()
      },
      function (done) {
        buildDependencies (done);
      },
      function (done) {
        installAll(opts, done);
      },
      function refreshPackageJSON(done) {
        fs.readFile(packageJSONPath, function (err, contents) {
          projectPackageJSON = JSON.parse(contents);

          done();
        })
      },

      function (done) {
        var names = []

        Object.keys(pluginsInstalled).forEach(function (n) {
          names.push(n)
          projectPackageJSON.wejs.plugins[n] = true
        })

        if (!names || !names.length) {
          log(Object.keys(installedDeps).length+' plugins already installed')
          log('0 plugins to install, nothing to do')
          return done()
        }

        log(names.join(' ')+' added in package.json.wejs.plugins')
        // update the package.json
        savePackageJSON(projectPackageJSON, done)
      },

      function runInstallMethodsIfNeed (done) {
        log('loading project')

        var we = helpers.getWe({
          bootstrapForInstall: true
        });

        we.bootstrap(function (err) {
          if (err) return done(err);
          we.exit(done);
        })
      }
    ], function (err) {
      if (err) {
        logError(err)
        return
      }

      log('done')

      process.exit()
    })
  })

  function buildDependencies (cb) {
    var name
    // get one for check deps
    for (var n in alreadyCheckedDependencies) {
      if (!alreadyCheckedDependencies[n] && !installedDeps[n]) {
        name = n
        break
      }
    }

    verboseLog('check:', name,  Object.keys(alreadyCheckedDependencies));

    // done all
    if (!name) return cb();

    getPackageJSONFromNpm (name, function(err, pkg) {
      if (err) return cb(err);
      // checked, set flag before check to skip conflic problems
      alreadyCheckedDependencies[name] = pkg
      pluginsToInstall[name] = pkg

      if (pkg.wejs && pkg.wejs.dependencies) {
        // have deps
        for (var n in pkg.wejs.dependencies) {
          // is installed
          if (installedDeps[n]) {
            alreadyCheckedDependencies[n] = installedDeps[n]
            break
          }
          // if not is in check list or not is installed
          if (!alreadyCheckedDependencies[n]) {
            // quene for check deps
            alreadyCheckedDependencies[n] = false
          }
        }
      }
      // run check again for check other module ...
      buildDependencies(cb)
    })
  }

  function installAll (opts, cb) {
    var names = Object.keys(pluginsToInstall)

    installModules (names, opts, cb)
  }

  function getPackageJSONFromNpm (name, cb) {
    exec('npm view --json '+name, function(err, stdout){
      if (err) return cb(err);
      cb(null, JSON.parse(stdout))
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
        if (err) return cb(err)

        cb(null)
      }
    )
  }

  function installModules (names,opts, cb) {
    var err = ''

    log('running: npm i --save '+names.join(' '))

    var copts = [ 'install' ];

    if (names && names.length) copts.push('--save')

    var cm = spawn('npm', copts.concat(names), {
      detached: true,
    })

    cm.stderr.on('data', function (data) {
      err += String(data)
    })

    cm.on('exit', function(code) {
      if (code !== 0) {
        cb(err)
      } else {
        names.forEach(function (n) {
          pluginsInstalled[n] = true
        })

        if (names.length) {
          log('npm module(s) '+names.join(' ')+' installed')
        }
        cb()
      }
    })
  }

  function installTheModule (name, opts, cb) {
    var err= ''

    log('running: npm i --save '+name)

    var copts = [ 'install', '--save' ];

    var cm = spawn('npm', copts.concat(name), {
      detached: true,
    })

    cm.stderr.on('data', function (data) {
      err += String(data)
    })

    cm.on('exit', function(code) {
      if (code !== 0) {
        cb(err)
      } else {
        log('npm module(s) '+name+' installed')
        cb()
      }
    })
  }
}