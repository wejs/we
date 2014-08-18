// lets use we-passport for easy include
var wePassport = require('we-passport');
/**
 * Use this Passport policy to check user acesss and pepopulate current logged in user
 */
module.exports = wePassport.init();