module.exports = function installCommand(program) {
  var path = require('path')
  var fs = require('fs')
  var spawn = require('child_process').spawn
  var async = require('async')
  var packageJSONPath = path.resolve(process.cwd(), 'package.json')
  var log = console.log
  var logError = console.log

  program
  .command('remove <pluginNames...>')
  .alias('rm')
  .option('--hide-log', 'Enable terminal log')
  .description('Remove plugins from current project')
  .action(function run(pluginNames, opts) {
    var packageJSON

    if (opts.hideLog) log = function(){}

    async.series([
      function (done) {
        if (opts.skipInstall) return done()

        removeModules(pluginNames, done)
      },
      function (done) {
        getPackageJSON(function (err, p) {
          if (err) {
            return done(err)
          }

          packageJSON = p

          if (!packageJSON.wejs) packageJSON.wejs = {}
          if (!packageJSON.wejs.plugins) packageJSON.wejs.plugins = {}
          if (!packageJSON.wejs.devPlugins) packageJSON.wejs.devPlugins = {}

          done()
        })
      },
      function (done) {
        pluginNames.forEach(function(n){
          delete packageJSON.wejs.plugins[n]
        })

       pluginNames.forEach(function(n){
          delete packageJSON.wejs.devPlugins[n]
        })

        log(pluginNames.join(' ')+' removed')

        done()
      },
      function (done) {
        // update the package.json
        savePackageJSON(packageJSON, done)
      }
    ], function afterAll (err) {
      if (err) {
        logError(err)
        return
      }

      console.log('done')
    })
  })

  function getPackageJSON (cb) {
    fs.readFile(packageJSONPath, function (err, b) {
      if (err) return cb(err)

      cb(null, JSON.parse( b.toString() ) )
    })
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

  function removeModules (names, cb) {
    var err= ''

    if (!names || !names.length) return cb();

    log('running: npm remove --save --save-dev '+names.join(' '))
    var copts = [ 'remove', '--save', '--save-dev' ]

    var cm = spawn('npm', copts.concat(names), {
      detached: true,
    })

    cm.stderr.on('data', function (data) {
      err += String(data)
    })

    cm.on('exit', function (code) {
      if (code !== 0) {
        cb(err)
      } else {
        log('npm module(s) '+names.join(' ')+' removed')
        cb()
      }
    })
  }
}