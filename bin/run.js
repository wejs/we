#!/usr/bin/env node

/**
 * Run one we.js project
 */

var helpers = require('../lib/helpers');

module.exports = function run() {
  if (helpers.checkIfAreInProject()) {
    require(process.cwd());
  } else {
    helpers.notInProjectError();
  }
}