module.exports = function (req, res, next) {

    if(req.isSocket){
        console.log('On police Is socket: ',req.isSocket);
       // console.log(req.handshake);
        return next();
    }

    if (req.isAuthenticated()) {
        return next();
    }

    return res.send("You Must Be Logged In", 403);

};