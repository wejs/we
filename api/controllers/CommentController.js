/**
 * CommentController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

// solves waterline bug for search string by objectid
var model_sulfix = '_1';

module.exports = {
  /*
  index: function (req, res){

    var model_id = req.param('model_id');
    var model_name = req.param('model_name');

    console.log('comments index:',model_id, model_name);
    console.log(req.params);

    Comment.find({
      model_id: model_id + model_sulfix,
      model_name: model_name
    })
    .sort('createdAt ASC')
    //.populate('creator')
    .exec(function(err, comments) {
      // Error handling
      if (err) {
        return sails.log.error(err);
        // TODO
      } else {
        console.log('comments',comments);
        res.send(comments);
      }
    });
  },
  */

  create : function (req, res, next){
    if(!req.isAuthenticated()) return req.forbidden();

    var comment = {};
    comment.body = req.param("body");
    comment.creator = req.user.id;
    comment.post = req.param('post');

    if(!comment.post){
      sails.log.warn('Post id is required');
      return res.send(400, {error: 'Post id is required' });
    }

    Comment.create(comment).exec(function(err, newInstance) {
      if (err) return res.negotiate(err);


      // If we have the pubsub hook, use the model class's publish method
      // to notify all subscribers about the created item
      Comment.publishCreate(newInstance);

      res.send({ comment: newInstance});
    });
  }

};
