// lets use oauth2 for easy include
var oauth2Consumer = require('we-oauth2').consumer;
// initialize oauth 2 consumer middleware
module.exports = oauth2Consumer.init();
