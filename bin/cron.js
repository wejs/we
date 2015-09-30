#!/usr/bin/env node

/**
 * Run all we.js plugins and project cron tasks
 */

var helpers = require('../lib/helpers');
var we;

module.exports = function run() {
  we = helpers.getWe();

  we.bootstrap(function (err) {
    if (err) return doneAll(err);
    we.runCron(doneAll);
  });

  function doneAll(err) {
    if (err) {
      we.log.error('Error on run we.js cron tasks:', err);
    }
    // end / exit
    we.exit(function () { process.exit(); });
  }
}