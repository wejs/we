
// Email config example
/*
module.exports.email = {
  // site email
  site_email: 'services@we-cms.org',
  // default from email
  from_email: 'We CMS',
  from_name:  'services@we-cms.org',

  // set default email service
  defaultService: 'Live',

  // set avaible email services configs
  services: {
    // See https://github.com/andris9/Nodemailer for others configs
    Live: {
      service: "Live",
      type: 'SMTP',
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      auth: {
          user: "email@outlook.com",
          pass: "eitapoha99"
      },
      tls: {
          ciphers:'SSLv3'
      }
    },
    gmail: {
      service: "Gmail",
      type: 'SMTP',
      auth: {
        user: "email@gmail.com",
        pass: "password"
      }
    }
  }
};
*/