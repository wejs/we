/**
 * Run tests in current we.js project or plugin
 */
module.exports = function testCommand(program) {

  const utils = require('../helpers'),
    path = require('path');

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

    let projectPath = process.cwd();

    const cfgs = {
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

    let Mocha;
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
    const mocha = new Mocha(cfgs);

    let bootstrapFile = path.join(projectPath, 'test', 'bootstrap.js');
    let testDir = path.join(projectPath, 'test', 'tests');

    utils.walk(testDir, (err, list)=> {
      if (err) throw err;

      mocha.addFile(bootstrapFile);

      list.filter( (file)=> {
        // Only keep the .js files
        return file.substr(-8) === '.test.js';
      }).forEach( (file)=> {
        mocha.addFile(file);
      });

      // Run the tests.
      mocha.run( (failures)=> {
        if (failures === 0) {
          console.log('Done all tests with success');
          return process.exit(0);
        }
        process.on('exit', ()=> {
          console.log('cabou2');
          process.exit( (failures || 0) );
        });
      });
    });

  });
};
