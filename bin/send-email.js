#!/usr/bin/env node

/**
 * Command to send emails with current project configuration and emails
 */

var helpers = require('../lib/helpers');
var we, templateVariables;

module.exports = function run(opts) {
  we = helpers.getWe();

  if (!opts.to) {
    console.log('--to param is required');
    return process.exit();
  }

  we.bootstrap(function (err) {
    if (err) return doneAll(err);

    var options = {
      subject: opts.subject,
      to: opts.to,
      html: opts.html,
      text: opts.text
    };

    console.log('Sending ...');

    if (opts.template) {
      templateVariables = JSON.parse(opts.template);
      // send email with template
      we.email.sendEmail(opts.template, options, templateVariables, doneAll);
    } else {
      // send without template
      we.email.send(options, doneAll);
    }
  });
}

function doneAll(err) {
  if (err) {
    we.log.error('Error on send email:', err);
  }
  // end / exit
  we.exit(function () { process.exit(); });
}