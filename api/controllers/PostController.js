/**
 * PostController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var util = require('util');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');


module.exports = {

  list: function (req,res) {

    Post.find()
    .where( actionUtil.parseCriteria(req) )
    .limit( actionUtil.parseLimit(req) )
    .skip( actionUtil.parseSkip(req) )
    .sort('updatedAt DESC')
    //.populate('comments')
    .exec(function(err, posts) {
      if (err) return res.serverError(err);
        var meta = {};

        // fetch metadata and some comments for every post
        async.each(posts, function(post, nextPost){
          Comment.getCommentsAndCount(post.id, function(err, comments, commentCount){
            if (err) return res.serverError(err);

            post.meta = {};
            post.meta.commentCount = commentCount;
            post._comments = [];

            post._comments = comments.reverse();

            nextPost();
          });

        },function(){
            res.send({
              post: posts,
              meta: meta
            });
        });
    });

    //res.view('home/index.ejs');
  },

};
