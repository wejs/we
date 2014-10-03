/**
 * CommentController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var util = require('util');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = {
  createOneRecord : function (req, res) {
    if(!req.isAuthenticated()) return req.forbidden();

    var comment = {};
    comment.body = req.param('body');
    comment.creator = req.user.id;
    comment.post = req.param('post');

    if(!comment.post){
      sails.log.warn('Post id is required');
      return res.send(400, {error: 'Post id is required' });
    }

    Comment.create(comment).exec(function(err, newInstance) {
      if (err) return res.negotiate(err);

      if ( req._sails.hooks.pubsub && req.isSocket ) {
        // If we have the pubsub hook, use the model class's publish method
        // to notify all subscribers about the created item
        Comment.publishCreate(newInstance.toJSON(), req);

      }

      NotificationService.setCommentNotifications('comment', 'created', newInstance, req.user);

      res.send({
        comment: newInstance
      });
    });
  },
  findOneRecord: function (req, res) {

    var Model = actionUtil.parseModel(req);
    var pk = actionUtil.requirePk(req);
    var modelName = req.options.model || req.options.controller;

    var query = Model.findOne(pk);
    //query = actionUtil.populateEach(query, req.options);
    query.exec(function found(err, matchingRecord) {
      if (err) return res.serverError(err);
      if(!matchingRecord) return res.notFound('No record found with the specified `id`.');
      /*
      if (sails.hooks.pubsub && req.isSocket) {
        Model.subscribe(req, matchingRecord);
        actionUtil.subscribeDeep(req, matchingRecord);
      }
      */

      var resultObject = {};

      resultObject[modelName] = matchingRecord;
      res.send(resultObject);
    });
  }

};
