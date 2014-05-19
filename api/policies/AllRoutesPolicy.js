/**
 * Run this code on all routes
 */
module.exports = function (req, res, ok) {
  // if user acess the page send default index and let angularjs mount the page

  if(!req.wantsJSON && !req.isSocket){

    if(
      req.options.controller == 'auth' ||
      req.options.controller == 'main'
    ){
      return ok();
    } else if(req.options.controller == 'images' && req.options.action == 'find'){
      return ok();
    } else {
      sails.log.info('Send the index page for request: ', req.url);
      return res.view("home/index.ejs");
    }

  }else{

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
              req.user = user;
            }

            return ok();
          });

        }else{
          // not authenticated ...
          return ok();
        }

      });


    }else{
      return ok();
    }


  }
};