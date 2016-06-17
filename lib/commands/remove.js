module.exports = function installCommand(program) {
  var path = require('path')
  var fs = require('fs')
  var spawn = require('child_process').spawn
  var async = require('async')
  var packageJSONPath = path.resolve(process.cwd(), 'package.json')
  var log = console.log
  var logError = console.log

  program
  .command('remove <pluginName>')
  .alias('rm')
  .option('--hide-log', 'Enable terminal log')
  .description('Remove one plugin from current project')
  .action(function run(pluginName, opts) {
    var packageJSON

    if (opts.hideLog) log = function(){}

    async.series([
      function (done) {
        if (opts.skipInstall) return done()

        removeTheModule(pluginName, done)
      },
      function (done) {
        getPackageJSON(function (err, p) {
          if (err) {
            return done(err)
          }

          packageJSON = p

          if (!packageJSON.wejs) packageJSON.wejs = {}
          if (!packageJSON.wejs.plugins) packageJSON.wejs.plugins = {}

          done()
        })
      },
      function (done) {
        delete packageJSON.wejs.plugins[pluginName]

        log(pluginName+' removed from package.json.wejs.plugins')

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

  function removeTheModule (name, cb) {
    var err= ''

    log('running: npm remove --save '+name)

    var cm = spawn('npm', [ 'remove', name, '--save' ], {
      detached: true,
    })

    cm.stderr.on('data', function (data) {
      err += String(data)
    })

    cm.on('exit', function (code) {
      if (code !== 0) {
        cb(err)
      } else {
        log('npm module '+name+' removed')
        cb()
      }
    })
  }
}