/**
 * isLoggedInPolicy
 *
 * @module      :: Policy
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {
  if( _.isEmpty(req.user) || _.isEmpty(req.user.id)){
    sails.log.verbose('User not authenticated ', req.options, req.user);
    return res.forbidden({
      error: 'You are not permitted to perform this action.'
    });
  }

  // is logged in
  return next();
};