#!/usr/bin/env node

/**
 * Run one we.js project
 */

var helpers = require('../lib/helpers');

module.exports = function run() {
  if (helpers.checkIfAreInProject()) {
    require(process.cwd());
  } else {
    console.error(
      'we-core not found, possible problems: \n\n'+
      '1- run "npm install" for install we-core and others dependencies in your project\n'+
      '2- "we run" we.js cli command only works in project folder\n'
    );
  }
}