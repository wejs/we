#!/usr/bin/env node

/**
 * Run tests in current we.js project or plugin
 */
var spawn = require('child_process').spawn;

module.exports = function test(opts) {
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
}