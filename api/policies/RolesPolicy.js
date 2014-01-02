module.exports = function (req, res, next) {
	var action = req.method;
  var isAllowed = false;
  var user = null;

  if(req.method) {
    action = req.method;
  }

  if(req.isSocket){
    console.log('On police Is socket activity: ',req.isSocket);
    return res.send("Socket access is not allowed here", 403);
  }

  if (req.isAuthenticated()) {
    if(req.user) {
      user = req.user;
    }
  }

  console.log(user);

  if (user && user.isAdmin){
    next();
  } else {
    return res.send("Forbiden", 403);
  }

};