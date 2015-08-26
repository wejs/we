#!/usr/bin/env node

/**
 * Load all we.js features and start node.js console.
 * see: https://nodejs.org/api/repl.html
 */

var repl = require('repl');
var helpers = require('../lib/helpers');
var we;

module.exports = function run() {
  we = helpers.getWe();

  we.bootstrap(function (err, we) {
    if (err) return doneAll(err);

    console.log('Starting we.js console, We.js object is avaible as we variable\n');

    var r = repl.start({
      prompt: 'We.js ;> ',
      input: process.stdin,
      output: process.stdout
    });
    // set we object
    r.context.we = we;
    // one exit ...
    r.on('exit', function () {
      console.log('Exit from we.js console.');
      doneAll();
    });
  });

  function doneAll(err) {
    if ( err ) {
      we.log.error('Error we.js console:', err);
    }

    we.exit(function () {
      // end / exit
      process.exit();
    });
  }
};