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
    });
  });
}
