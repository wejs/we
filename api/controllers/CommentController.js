/**
 * CommentController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

// solves waterline bug for search string by objectid
var model_sulfix = '_1';

module.exports = {

  index: function (req, res){

    var model_id = req.param('model_id');
    var model_name = req.param('model_name');

    Comment.find({
      model_id: model_id + model_sulfix,
      model_name: model_name
    })
    .sort('createdAt ASC')
    .populate('creator')
    .exec(function(err, comments) {
      // Error handling
      if (err) {
        return sails.log.error(err);
        // TODO
      } else {
        res.send(comments);
      }
    });
  },

  create : function (req, res, next){

    var comment = {};
    comment.text = req.param("text");
    comment.creator = req.user.id;
    comment.model_name = req.param("model_name");
    comment.model_id = req.param("model_id");

    if(comment.model_id){
      comment.model_id += model_sulfix;
    }else{
      sails.log.warn('Model id is required to create a comment');
      return res.send(400, {error: 'Model id is required to create a comment' });
    }

    Comment.create(comment).exec(function(error, newComment) {
      if (error) {
        sails.log.error('Error on comment create',error);
        res.send(500, {error: res.i18n("DB Error") });
      } else {
        res.send({
          'item': newComment
        });
      }
    });
  }

};
