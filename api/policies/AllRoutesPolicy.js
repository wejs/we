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

    // get image
    } else if(req.options.controller == 'images' && req.options.action == 'find'){
      return ok();
    // get user avatar
    }else if(req.options.controller == 'user' && req.options.action == 'getavatar'){
      console.log('get avatar');
      return ok();
    } else {
      sails.log.info('Send the index page for request: ', req.url);
      return res.view("home/index.ejs");
    }

  }else{
    return ok();
  }
};