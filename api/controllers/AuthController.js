// api/controllers/AuthController.js

var passport = require('passport');

module.exports = {

  index: function (req,res)	{
		res.view();
	},

	create: function(req, res) {
		passport.authenticate('local', function(err, user, info) {
			if ((err) || (!user))	{
				res.redirect('/login');
				return;
			}

			req.logIn(user, function(err) {
				if (err) {
					res.view();
					return;
				}

				res.redirect('/');
				return;
			});
		})(req, res);
	},

	logout: function (req,res) {
		req.logout();
		res.redirect('/');
	}

};