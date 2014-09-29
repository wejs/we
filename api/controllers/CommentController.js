/**
 * CommentController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
  create : function (req, res){
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

      if (req.isSocket) {
        // If we have the pubsub hook, use the model class's publish method
        // to notify all subscribers about the created item
        Comment.publishCreate(newInstance);
      }

      res.send({
        comment: newInstance
      });
    });
  }

};
