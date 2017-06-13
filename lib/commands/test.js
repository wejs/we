var utils = require('../helpers'),
  fs = require('fs'),
  path = require('path');

module.exports = function testCommand(program) {
  /**
   * Run tests in current we.js project or plugin
   */
  program
  .command('test')
  .alias('t')
  .option('-g, --grep [string]', 'Only run tests with this string in name or description')
  .option('-u, --ui [bdd|tdd|qunit|exports]', 'Specify user-interface (bdd|tdd|qunit|exports), defaults to bdd')
  .option('-R, --reporter <name>', 'Defaults to "spec". Specify the reporter to use, see mocha --reporters to see all options avaible')
  .option('-b, --bail', 'Bail after first test failure')
  .option('-s, --slow <ms>', '"slow" test threshold in milliseconds [75]')
  .option('-t, --timeout <ms>', 'set test-case timeout in milliseconds [20000]')
  .description('Run tests in current folder')
  .action(function test(opts) {

    // Override node env to aways run as test:
    process.env.NODE_ENV = 'test';

    var projectPath = process.cwd();

    var cfgs = {
      ui: (opts.ui || 'bdd'),
      reporter: (opts.reporter || 'spec'),
      bail: true,
      useColors: true,
      retries: 0,
      slow: (opts.slow || 100),
      ignoreLeaks: false,
      fullTrace: false,
      timeout: (opts.slow || 20000)
    };

    if (opts.grep) cfgs.grep = opts.grep;


    var Mocha;
    try {
      Mocha = require(path.join(projectPath, 'node_modules', 'mocha'));
    } catch(e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        console.log(
          '"mocha" npm module not found! \n'+
          'Options bellow may help solve the problem: \n'+
          '  1- Check if you are in an we.js root project folder. \n'+
          '  2- Run npm install in current folder. \n'+
          '  3- Check if mocha module is installed in your We.js project,'+
            ' this is dont by default in We.js projects.\n'+
          '  4- Open a issue in We.js repository in https://github.com/wejs/we \n'
        );
        process.exit();
      }

      console.log('Unknow error on load mocha module from current folder');
      throw e;
    }
    // Instantiate a Mocha instance.
    var mocha = new Mocha(cfgs);

    var bootstrapFile = path.join(projectPath, 'test', 'bootstrap.js');
    var testDir = path.join(projectPath, 'test', 'tests');

    utils.walk(testDir, function(err, list) {
      if (err) throw err;

      mocha.addFile(bootstrapFile);

      list.filter(function(file) {
        // Only keep the .js files
        return file.substr(-8) === '.test.js';
      }).forEach(function(file) {
        mocha.addFile(file);
      });

      // Run the tests.
      mocha.run(function(failures) {
        if (failures === 0) {
          console.log('Done all tests with success');
          return process.exit(0);
        }
        process.on('exit', function () {
          console.log('cabou2');
          process.exit( (failures || 0) );
        });
      });
    });

  });
}
