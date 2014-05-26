module.exports = function (req, res, next) {

    if(req.isSocket){
      if( ! _.isEmpty(req.user) ){
        return next();
      }

    }else{
      if (req.isAuthenticated()) {
          return next();
      }
    }

    return res.send("You Must Be Logged In", 403);
};