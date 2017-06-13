module.exports = function testCommand(program) {
  /**
   * Run tests in current we.js project or plugin
   */
  var spawn = require('child_process').spawn;

  program
  .command('test')
  .alias('t')
  .option('-g, --grep [string]', 'Only run tests with this string in name or description')
  .description('Run tests in current folder')
  .action(function test(opts) {
    var copts = [
      './node_modules/.bin/mocha',
      'test/bootstrap.js',
      'test/**/*.test.js',
      '-b',
      '--colors'
    ];

    if (opts.grep) {
      copts.push('-g');
      copts.push(opts.grep);
    }

    spawn('node', copts, {
      stdio: 'inherit' ,
      env: {
        'NODE_ENV': 'test',
        'LOG_LV': 'info'
      }
    })
    .on('error', function( err ) { 
      if (err.code == 'ENOENT' && syscall == 'spawn node') {
        console.log(
          '"node" command not found, cant run tests with we test without "node" command \n'+
          'Try to run with "npm start"'
        );
      } else {
        console.log('Error on run the tests command:');
        throw err;
      }
    });
  });
}
