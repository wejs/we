// EmailService.js - in api/services
// from https://github.com/balderdashy/sails-docs/blob/0.9/services.md
//

var weSendEmail = require('we-send-email');
weSendEmail.setConfigs(sails.config.email);

// exports.sendInviteEmail = function(options) {
//   var smtpTransport;

//   smtpTransport = weSendEmail.getServerTransport(options);

//   var opts = {"type":"messages","call":"send","message":
//     {
//       "subject": "We.js",
//       "from_email": "services@wejs.org",
//       "from_name": "we.js",
//       "to":[
//           {"email": options.email, "name": options.name}
//       ],
//       "text": "Dear "+options.name+",\nYou're in the Alfa! Click <insert link> to verify your account"
//     }
//   };

//     // setup e-mail data with unicode symbols
//   var mailOptions = {
//     from: sails.config.appName + " <" + sails.config.siteEmail + ">", // sender address
//     to: options.email, // list of receivers
//     subject: "Hello", // Subject line
//     text: "Hello world", // plaintext body
//     html: "<b>Hello world</b>" // html body
//   };

// };

exports.sendAccontActivationEmail = function(user, siteBaseUrl, cb){
  AuthToken.create( { 'user_id': user.id} ).exec(function(error, token) {
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

    weSendEmail.sendEmail(options ,templateName ,templateVariables, cb);
  });

};

