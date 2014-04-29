/**
 * CommentController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */

  index: function (req, res){

    var model_id = req.param('model_id');
    var model_name = req.param('model_name');

    Comment.find(
      {
        model_id: model_id,
        model_name: model_name
      }
    )
    .sort('createdAt ASC')
    .exec(function(err, comments) {
      // Error handling
      if (err) {
        return console.log(err);
        // TODO
      // Found multiple users!
      } else {
        res.send(comments);
      }
    });
  },

  create : function (req, res, next){

    var comment = {};
    comment.text = req.param("text");
    comment.creator_id = req.user.id;
    comment.model_name = req.param("model_name");
    comment.model_id = req.param("model_id");

    Comment.create(comment).exec(function(error, newComment) {
      if (error) {
        res.send(500, {error: res.i18n("DB Error") });
      } else {
        res.send({
          'item': newComment
        });
      }
    });
  }

};
