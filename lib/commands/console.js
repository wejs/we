/**
 * Load all we.js features and start node.js console.
 * see: https://nodejs.org/api/repl.html
 */
module.exports = function consoleCommand(program) {
  const repl = require('repl'),
    helpers = require('../helpers');

  let we;

  program
  .command('console')
  .alias('c')
  .description('Bootstrap we.js and start node.js console. see: https://nodejs.org/api/repl.html')
  .option('-S, --server', 'Start server on run')
  .action(function run(opts) {
    we = helpers.getWe();

    we.utils.async.series([
      function (done) {
        we.bootstrap( done );
      },
      function (done) {
        if (!opts.server) return done();
        we.startServer(done);
      }
    ], (err)=> {
      if (err) {
        return doneAll(err);
      }

      console.log('Starting we.js console, We.js object is avaible as we variable\n');

      const r = repl.start({
        prompt: 'We.js ;> ',
        input: process.stdin,
        output: process.stdout
      });
      // set we object
      r.context.we = we;
      // one exit ...
      r.on('exit', ()=> {
        console.log('Exit from we.js console.');
        doneAll();
      });
    });

    function doneAll(err) {
      if ( err ) {
        we.log.error('Error in we.js CLI:', err);
      }

      we.exit( ()=> {
        // end / exit
        process.exit();
      });
    }
  });

};