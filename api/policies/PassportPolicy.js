// lets use we-passport for easy include
var wePassport = require('we-passport');
// initialize passport configs
var passportMiddleware =  wePassport.init();

/**
 * Use this Passport policy to check user acesss and pepopulate current logged in user
 */
module.exports = function (req, res, ok) {
  passportMiddleware(req, res, ok);
};