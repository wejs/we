/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, ok) {

  if(req.isSocket){
      // Get session and current user
      sails.session.fromSocket(req.socket, function (err, session) {
        if(err){
          sails.log.error(err);
          return res.forbidden('You are not permitted to perform this action.');
        }

        if(session && session.passport && session.passport.user){
          return ok();
        }
        return res.forbidden('You are not permitted to perform this action.');
      });
  }else{

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (req.session.authenticated) {
      return ok();
    }

    return res.forbidden('You are not permitted to perform this action.');
  }

};
