/**
 * Check if user is tring to get its won notfications
 */

module.exports = function (req, res, next) {
  var user = req.param('user');

  if ( (req.user.id != user) || !user ) {
    req.params.user = req.user.id;
    return res.forbidden();
  }

  return next();
};