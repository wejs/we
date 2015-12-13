#!/usr/bin/env node

/**
 * Run one we.js project
 */

var helpers = require('../lib/helpers');
var exec = require('child_process').exec;
var we;

module.exports = function run() {

}

function doneAll(err) {
  if ( err ) we.log.error('Error:', err);
  we.exit(function(){ process.exit(); });
}