module.exports = function (req, res, next) {
  var isAllowed = false;
  var action = req.options.action;
  var user = req.user;

  switch(req.method){
    case 'GET':
      isAllowed = true;
      break;
    case 'POST':
      if(!user.id){
        return res.send("You Must Be Logged In", 403);
      }


      isAllowed = true;

      break;
    case 'PUT':
      if(!user.id){
        return res.send("You Must Be Logged In", 403);
      }

      isAllowed = true;

      break;
    case 'DELETE':
      if(!user.id){
        return res.send("You Must Be Logged In", 403);
      }

      isAllowed = true;

      break;
  }

  if (isAllowed){
    next();
  } else {
    return res.send("You Must Be Logged In", 403);
  }

};