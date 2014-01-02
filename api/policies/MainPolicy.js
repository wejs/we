module.exports = function (req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        var action = req.param('action');
        if (action == "create") {
            req.body.userId = req.session.user.id;
            req.body.username = req.session.user.username;
        }
        next();
    } else {
        res.send("You Must Be Logged In", 403);
    }
};