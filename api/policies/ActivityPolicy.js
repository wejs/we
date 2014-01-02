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

  switch(action){
    case 'GET':
      isAllowed = true;
      break;
    case 'POST':
      if(user.id){
        isAllowed = true;
      }
      
      break;
    case 'PUT':
      if(user.id){
        isAllowed = true;
      }
      break;
    case 'DELETE':
      if(user.id){
        isAllowed = true;
      }
      break;
  }

  if (isAllowed){
    next();
  } else {
    return res.send("You Must Be Logged In", 403);
  }

};