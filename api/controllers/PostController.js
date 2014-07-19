/**
 * PostController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var util = require('util');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');


module.exports = {

  list: function list(req,res) {

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

  createRecord: function createRecord(req, res) {

    var Model = Post;

    var modelName = req.options.model || req.options.controller;

    // Create data object (monolithic combination of all parameters)
    // Omit the blacklisted params (like JSONP callback param, etc.)
    var data = actionUtil.parseValues(req);

    sails.log.warn('post data',data);

    return ;

    // Create new instance of model using data from params
    Model.create(data).exec(function created (err, newInstance) {

      // Differentiate between waterline-originated validation errors
      // and serious underlying issues. Respond with badRequest if a
      // validation error is encountered, w/ validation info.
      if (err) return res.negotiate(err);

      // If we have the pubsub hook, use the model class's publish method
      // to notify all subscribers about the created item
      // if (req._sails.hooks.pubsub) {
      //   if (req.isSocket) {
      //     Model.subscribe(req, newInstance);
      //     Model.introduce(newInstance);
      //   }
      //   Model.publishCreate(newInstance, !req.options.mirror && req);
      // }

      // Send JSONP-friendly response if it's supported
      // (HTTP 201: Created)

      var resultObject = {};

      resultObject[modelName] = newInstance.toJSON();

      res.status(201);
      res.ok(resultObject);
    });
  }
};
