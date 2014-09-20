/**
 * isCreatorPolicy
 *
 * Check if user is creator of content
 */

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = function (req, res, ok) {
  if (!req.isAuthenticated()) {
    return res.forbidden();
  }

  var Model = actionUtil.parseModel(req);
  var pk = actionUtil.requirePk(req);

  Model.findOneById(pk).exec(function(error, record){
    if(error){
      sails.log.error('Error on get user from session in socket.io: ', err);
      return res.serverError();
    }

    if (!record) {
      return res.notFound();
    }

    if (record.creator == req.user.id) {
      return ok();
    } else {
      return res.forbidden();
    }

  });

};