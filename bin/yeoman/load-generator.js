#!/usr/bin/env node

/**
 * Yeoman CLI loader 
 * 
 * get from yeoman cli.js file
 */

var fs = require('fs');
var path = require('path');
var nopt = require('nopt');
var chalk = require('chalk');
var pkg = require('../../package.json');
var _ = require('lodash');
var updateNotifier = require('update-notifier');
var sudoBlock = require('sudo-block');
var isRoot = require('is-root');
var Insight = require('insight');
var yosay = require('yosay');
var stringLength = require('string-length');

module.exports = function loadTheGenerator(loadDone) {
  var weFolder = path.resolve(__dirname, '../..');
  var opts = nopt({
    help: Boolean,
    version: Boolean
  });

  var args = opts.argv.remain;
  var cmd = args[0];

  function rootCheck() {
    if (isRoot() && process.setuid) {
      try {
        // Try to force yo to run on a safe uid
        process.setuid(501);
      } catch (err) {}
    }

    var msg = chalk.red('Easy with the "sudo"; Yeoman is the master around here.') + '\n\n\
  Since yo is a user command, there is no need to execute it with superuser\n\
  permissions. If you\'re having permission errors when using yo without sudo,\n\
  please spend a few minutes learning more about how your system should work\n\
  and make any necessary repairs.\n\n\
  A quick solution would be to change where npm stores global packages by\n\
  putting ~/npm/bin in your PATH and running:\n' + chalk.blue('npm config set prefix ~/npm') + '\n\n\
  Reading material:\n\
  http://www.joyent.com/blog/installing-node-and-npm\n\
  https://gist.github.com/isaacs/579814\n';

    sudoBlock(msg);
  }

  function pre() {
    if (opts.version) {
      console.log(pkg.version);
      return;
    }

    // debugging helper
    if (cmd === 'doctor') {
      require('yeoman-doctor').run();
      return;
    }

    // easteregg
    if (cmd === 'yeoman' || cmd === 'yo') {
      console.log(require('yeoman-character'));
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