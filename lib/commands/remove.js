/**
 * Command to remove plugins from current project
 */
module.exports = function removePluginCommand(program) {
  const path = require('path'),
    fs = require('fs'),
    spawn = require('child_process').spawn,
    async = require('async'),
    packageJSONPath = path.resolve(process.cwd(), 'package.json');

  let log = console.log,
    logError = console.log;

  program
  .command('remove <pluginNames...>')
  .alias('rm')
  .option('--hide-log', 'Enable terminal log')
  .description('Remove plugins from current project')
  .action(function run(pluginNames, opts) {
    let packageJSON;

    if (opts.hideLog) log = function(){};

    async.series([
      function (done) {
        if (opts.skipInstall) return done();
        removeModules(pluginNames, done);
      },
      function (done) {
        getPackageJSON( (err, p)=> {
          if (err) {
            return done(err);
          }

          packageJSON = p;

          if (!packageJSON.wejs) packageJSON.wejs = {};
          if (!packageJSON.wejs.plugins) packageJSON.wejs.plugins = {};
          if (!packageJSON.wejs.devPlugins) packageJSON.wejs.devPlugins = {};

          done();
        });
      },
      function (done) {
        pluginNames.forEach( (n)=> {
          delete packageJSON.wejs.plugins[n];
          if (packageJSON.dependencies)
            delete packageJSON.dependencies[n];
        });

        pluginNames.forEach( (n)=> {
          delete packageJSON.wejs.devPlugins[n];
          if (packageJSON.devDependencies)
            delete packageJSON.devDependencies[n];
        });

        log(pluginNames.join(' ')+' removed');

        done();
      },
      function (done) {
        // update the package.json
        savePackageJSON(packageJSON, done);
      }
    ], function afterAll (err) {
      if (err) {
        logError(err);
        return;
      }

      console.log('done');
    });
  });

  function getPackageJSON (cb) {
    fs.readFile(packageJSONPath, (err, b)=> {
      if (err) return cb(err);

      cb(null, JSON.parse( b.toString() ) );
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

  function removeModules (names, cb) {
    let err = '';

    if (!names || !names.length) return cb();

    log('running: npm remove '+names.join(' '));
    let copts = [ 'remove'];

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
        cb();
      }
    });
  }
};
