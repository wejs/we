#!/usr/bin/env node

/**
 * Yeoman CLI loader 
 */

var fs = require('fs');
var path = require('path');
var nopt = require('nopt');
var pkg = require('../../package.json');
var _ = require('lodash');

module.exports = function loadTheGenerator(loadDone) {
  var weFolder = path.resolve(__dirname, '../..');
  var opts = nopt({
    help: Boolean,
    version: Boolean
  });

  var args = opts.argv.remain;
  var cmd = args[0];

  function pre() {
    if (opts.version) {
      console.log(pkg.version);
      return;
    }

    init();
  }

  function init() {
    var env = require('yeoman-environment').createEnv();

    env.on('end', function () {
      console.log('Done running sir');
    });

    env.on('error', function (err) {
      console.error('Error', process.argv.slice(2).join(' '), '\n');
      console.error(opts.debug ? err.stack : err.message);
      process.exit(err.code || 1);
    });

    // lookup for every namespaces, within the environments.paths and lookups
    env.lookup(function () {
      if (!env.store._generators['wejs:blog']) {
        console.log('\
\n\
===================================================================\n\
We.js yeoman generator not found, install with:\n\
$ npm install generator-wejs -g\n\
===================================================================\n\
        ');

        return;
      }

      loadDone(null, env, opts);
    });
  }

  pre();
}