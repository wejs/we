// EmailService.js - in api/services
// from https://github.com/balderdashy/sails-docs/blob/0.9/services.md

var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Live",
    auth: {
        user: "services@we-cms.org",
        pass: "AnPaSs3*4mp13"
    }
});

exports.sendInviteEmail = function(options) {

    var opts = {"type":"messages","call":"send","message":
        {
            "subject": "We CSMS ;)",
            "from_email": "services@we-cms.org",
            "from_name": "We CMS",
            "to":[
                {"email": options.email, "name": options.name}
            ],
            "text": "Dear "+options.name+",\nYou're in the Beta! Click <insert link> to verify your account"
        }
    };


    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: sails.config.appName + " <" + sails.config.siteEmail + ">", // sender address
        to: options.email, // list of receivers
        subject: "Hello", // Subject line
        text: "Hello world", // plaintext body
        html: "<b>Hello world</b>" // html body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });

    //myEmailSendingLibrary.send(opts);
};