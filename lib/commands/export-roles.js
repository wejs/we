module.exports = function exportRolesCommand(program) {
  /**
   * Script to exports roles to config file
   */

  var fs = require('fs');
  var helpers = require('../helpers');
  var we;

  program
  .command('export-roles')
  .option('-c, --console', 'Print roles in console and dont save in file')
  .description('Export all project roles to file')
  .action(function run(opts) {
    we = helpers.getWe();

    we.bootstrap(function (err) {
      if (err) return doneAll(err);

      var folder = we.projectPath + '/config';

      we.utils.async.series([
        function createConfigFolderIfNotExists(done) {
          fs.lstat(folder, function (e){
            if (e) {
              if (e.code == 'ENOENT') {
                // create the folder if not exists
                we.utils.mkdirp(folder, function (err) {
                  if (err) return done(err);
                  done();
                });
              } else {
                throw e;
              }
            } else {
              done();
            }
          });
        },

        function writeRolesFile(done) {
          var roles = we.acl.exportRoles();

          var data = 'module.exports = {\n'+
            '\'roles\': '+
              JSON.stringify(roles, null, '\t')
              .replace(/\"/g, '\'') +
            '\n'+
          '};\n'

          if (opts.console) {
            // log to console flag
            console.log(data);
            return doneAll();
          }

          var file = folder+'/roles.js';

          fs.writeFile(file, data, function (err){
            if (err) return done(err);

            we.log.info('Done roles exported to: ' + file);

            done();
          });
        }

      ], doneAll);
    });

    function doneAll(err) {
      if ( err ) {
        we.log.error('Error in we.js CLI:', err);
      }

      we.exit(function () {
        // end / exit
        process.exit();
      });
    }
  });
}
