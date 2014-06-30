/**
 * PrePopuplateAuthenticatedUserPolicy
 * Prepopular user in req.user
 * TODO move to customMiddleware
 */
module.exports = function (req, res, ok) {
  // prepopulate user for socket io requests
  if(req.isSocket){
    // Get session and current user
    sails.session.fromSocket(req.socket, function (err, session) {
      if(err){
        sails.log.error(err);
        return res.send("Forbiden", 403);
      }
      if(session && session.passport && session.passport.user){
        User.findOneById(session.passport.user).exec(function(error, user){
          if(error){
            sails.log.error('Error on get user from session in socket.io: ', err);
          }
          if(user){
            // set user
            req.user = user;
          }
          return ok();
        });
      }else{
        req.user = null;
        return ok();
      }
    });
  }else{
    return ok();
  }

};