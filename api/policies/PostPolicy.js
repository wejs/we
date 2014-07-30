module.exports = function (req, res, next) {
  var isAllowed = false;
  var action = req.options.action;
  var user = req.user;

  switch(req.method){
    case 'GET':
      isAllowed = true;
      break;
    case 'POST':
    case 'PUT':
    case 'DELETE':
      isAllowed = !(!user.id);
      break;
  }

  if (isAllowed){
    next();
  } else {
    return res.send("You Must Be Logged In", 403);
  }

};
