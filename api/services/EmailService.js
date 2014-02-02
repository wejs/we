// EmailService.js - in api/services
// from https://github.com/balderdashy/sails-docs/blob/0.9/services.md

var nodemailer = require("nodemailer");
//var templatesDir   = path.resolve(__dirname, '..', 'views/mailer');
var emailTemplates = require('email-templates');

exports.sendInviteEmail = function(options) {
  var smtpTransport;

  smtpTransport = EmailService.getServerTransport(options);

  var opts = {"type":"messages","call":"send","message":
    {
      "subject": "WE ;)",
      "from_email": "services@we-cms.org",
      "from_name": "WE",
      "to":[
          {"email": options.email, "name": options.name}
      ],
      "text": "Dear "+options.name+",\nYou're in the Alfa! Click <insert link> to verify your account"
    }
  };


    // setup e-mail data with unicode symbols
  var mailOptions = {
    from: sails.config.appName + " <" + sails.config.siteEmail + ">", // sender address
    to: options.email, // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world", // plaintext body
    html: "<b>Hello world</b>" // html body
  };

  // send mail with defined transport object
  /*
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
  });
*/
  //myEmailSendingLibrary.send(opts);
};

exports.sendAccontActivationEmail = function(user, siteBaseUrl, cb){
  var smtpTransport;

  AuthToken.create( {user_id: user.id} ).done(function(error, token) {
    if(error) return cb(error);

    var options = {};

    options.email = user.email;
    options.subject = 'WE Account activation email';

    var templateVariables = {
      user: {
        name: user.name
      },
      site: {
        name: 'WE',
        slogan: 'MIMI one slogan here'
      },
      confirmUrl: siteBaseUrl + '/user/'+ user.id +'/activate/' + token.token
    };

    var templateName = 'AccontActivationEmail';
    options.subject = 'WE -> Register validation email :)';

    EmailService.sendEmail(options ,templateName ,templateVariables, cb);
  });

};

/**
 * Get server transport configs
 * See: nodemailer.createTransport
 * @param  string serviceName email server config name
 */
exports.getServerTransport = function(serviceName) {
  var emailServerTransport;
  var emailServerConfig;
  //console.log(sails.util);
  if(!serviceName){

    if( !sails.util.isUndefined(sails.config.email) )
      if( !sails.util.isUndefined( sails.config.email.defaultService ) ){
        serviceName = sails.config.email.defaultService;
      }
  }

  if(serviceName) {
    if( !sails.util.isUndefined(sails.config.email.services) ){

      if( !sails.util.isUndefined( sails.config.email.services[serviceName] ) ){
        emailServerConfig = sails.config.email.services[serviceName];
        // create reusable transport method (opens pool of SMTP connections)
        emailServerTransport = nodemailer.createTransport(
          emailServerConfig['type'],emailServerConfig
        );

      }else{
        // error, service not found
        sails.log.error('Email service not found in config check if sails.config.email.services[serviceName exists');

      }

    } else {
      sails.log.error('Email services not found in config');
    }

    // TODO add local email config to default

  }

  return emailServerTransport;
};

exports.sendEmail = function(options, templateName, templateVariables, cb) {

  var templatesDir = sails.config.paths.views + '/mailer';
  emailTemplates(templatesDir, function(err, template) {
    if (err) return cb(err, null);

    // ## Send a single email

    // Prepare nodemailer transport object
    var transport = EmailService.getServerTransport();

    // Send a single email
    template(templateName, templateVariables, function(err, html, text) {
      if (err) return cb(err, null);

      // if are in test enviroment or transport not fount show email on console
      if( sails.config.environment == 'test' || !transport ){
        // dont send emails in test enviroment
        console.info('---- EmailService.sendEmail() ----');
        console.info('---- Displaying the email that would be sent ----');
        console.info('To:\n',options.email);
        console.info('Text:\n',html);
        console.info('----------------------------- END --------------------------');

        return cb();

      } else {

        // Send the email
        transport.sendMail({
          from: sails.config.appName +' <' + sails.config.email.site_email + '>',
          to: options.email,
          subject: options.subject,
          html: html,
          // generateTextFromHTML: true,
          text: text
        }, function(err, responseStatus) {
          if (err) return cb(err, null);

          sails.log.info('EmailService',responseStatus.message);

          return cb(null,responseStatus);
        });

      }

    });

  });
};