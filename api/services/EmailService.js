// EmailService.js - in api/services
// from https://github.com/balderdashy/sails-docs/blob/0.9/services.md

var nodemailer = require("nodemailer");
//var templatesDir   = path.resolve(__dirname, '..', 'views/mailer');
var emailTemplates = require('email-templates');


/**
 * Send one email with configs set in sails configs
 * @param  {object}   options              options on format: {email: 'toemail@exam.c', subject: 'email subject'}
 * @param  {string}   templateName         email template name
 * @param  {object}   templateVariables    variables to send to template
 * @param  {Function} cb                   after ends call cb( error, responseStatus);
 */
exports.sendEmail = function(options, templateName, templateVariables, cb) {
  var templatesDir;

  // get email template dir
  if(sails.config.themes.enabled){
    var theme_enabled = require(sails.config.themes.enabled);

    templatesDir = sails.config.appPath + '/node_modules/'+ sails.config.themes.enabled + '/' + theme_enabled.configs.emailTemplates.path;
  }else{
    templatesDir = sails.config.paths.views + '/mailer';
  }

  // load email template
  emailTemplates(templatesDir, function(err, template) {
    if (err) return cb(err, null);

    // ## Send a single email

    // Prepare nodemailer transport object
    var transport = EmailService.getServerTransport();

    // Send a single email
    template(templateName, templateVariables, function(err, html, text) {
      if (err) return cb(err, null);

      // if are in test enviroment or transport not found in configs
      // print email on console
      if( sails.config.environment == 'test' || !transport ){
        EmailService.showDebugEmail(options, html, text);
        return cb();
      }

      var email = {
        to: options.email,
        subject: options.subject,
        html: html,
        // generateTextFromHTML: true,
        text: text
      };

      if(options.from){
        email.from = options.from;
      }else{
        email.from = sails.config.appName +' <' + sails.config.email.site_email + '>';
      }

      // Send the email
      transport.sendMail(email, function(err, responseStatus) {
        if (err) return cb(err, null);

        return cb(null,responseStatus);
      });
    });
  });
};


exports.sendInviteEmail = function(options) {
  var smtpTransport;

  smtpTransport = EmailService.getServerTransport(options);

  var opts = {"type":"messages","call":"send","message":
    {
      "subject": "We.js",
      "from_email": "services@wejs.org",
      "from_name": "we.js",
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


  AuthToken.create( {user_id: user.id} ).exec(function(error, token) {
    if(error) return cb(error);

    var options = {};
    // to email
    options.email = user.email;

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
    // TODO make this var dinamic and translate it
    options.subject = 'We.js -> Register validation email.';

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

/**
 * Show email on terminal - to tests and if dont have a email server configured
 */
exports.showDebugEmail = function(options, html, text){
  // dont send emails in test enviroment
  sails.log.info('---- EmailService.showDebugEmail ----');
  sails.log.info('---- Email options: ----');
  sails.log.info(options);
  sails.log.info('---- Displaying the html email that would be sent ----');
  sails.log.info('HTML:\n',html);
  sails.log.info('---- Displaying the text email that would be sent ----');
  sails.log.info('text:\n',text);
  sails.log.info('----------------------------- END --------------------------');
};
