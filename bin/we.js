#!/usr/bin/env node


/**
 * Module dependencies
 */

var _ = require('lodash');
var program = require('./_commander');
var package = require('../package.json');
var NOOP = function() {
  console.error('Command not found: ', program.args[0]);
  console.error('Use "we" command to show all avaible commands');
};

program
  .version(package.version, '-v, --version');
//
// Normalize version argument, i.e.
//
// $ we -v
// $ we -V
// $ we --version
// $ we version
//
// make `-v` option case-insensitive
process.argv = _.map(process.argv, function(arg) {
  return (arg === '-V') ? '-v' : arg;
});
// $ we version (--version synonym)
program
  .command('version')
  .description('')
  .action(program.versionInformation);

program
  .command('generate [type]')
  .description('')
  .action(require('./we-generator'));

program
  .command('install')
  .option('-r, --resetdatabase', 'Reset database and reload all data?')
  .option('-u, --setUserData', 'Set first user data?')
  .description('Run install project scripts')
  .parse(process.argv)
  .action(require('./install.js'));

program
  .command('createUser [new?]')
  .description('')
  .action(require('./create-user'));

program
  .command('setUserAsAdmin [id]')
  .description('')
  .action(require('./set-user-as-admin'));

program
  .command('resetDB')
  .description('Delete and recreate all tables')
  .action(require('./reset-database.js'));

program
  .command('uli [id]')
  .description('Get one time login url')
  .action(require('./uli.js'));




// Don't balk at unknown options
program.unknownOption = NOOP;
// $ we
//
program.parse(process.argv);
var NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.usageMinusWildcard();
}

