/**
 * Run this code on all routes
 */
module.exports = function (req, res, ok) {
  // if user acess the page send default index and let angularjs mount the page
  if(!req.wantsJSON && !req.isSocket){
    sails.log.info('Send the index page for request: ', req.url);
    return res.view("home/index.ejs");
  }else{
    return ok();
  }
};