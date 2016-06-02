module.exports = function sendEmailCommand(program) {
  /**
   * Command to send emails with current project configuration and emails
   */

  var helpers = require('../helpers');
  var we, templateVariables;

  program
  .command('send-email')
  .option('-t, --to <email>', 'Email how will receive the text. Ex: contact.wejs.org')
  .option('-H, --html [html]', 'Email content in html format')
  .option('-s, --text [text]', 'Email content in text format')
  .option('-T, --template [template]', 'Template name. keep empty to send without template')
  .option('-V, --variables [variables]', 'Template variables, locals. Set it as string with JSON.stringify()')
  .description('Send one email with current project configuration')
  .action(function run(opts) {
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
  });

  function doneAll(err) {
    if (err) {
      we.log.error('Error on send email:', err);
    }
    // end / exit
    we.exit(function () { process.exit(); });
  }

}