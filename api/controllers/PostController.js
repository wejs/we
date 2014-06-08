/**
 * PostController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function (req,res) {

    Post.find({})
      .limit(10)
      .sort('updatedAt DESC')
      .populate('comments')
      .exec(function(err, posts) {
      // Error handling
      if (err) {
        return console.log(err);
        // TODO
      } else {
        Comment.watch(req.socket);
        res.send(posts);
      }
    });

    //res.view('home/index.ejs');
  },

  create : function (req, res){

    var post = {};
    post.body = req.param("body");
    post.creator = req.user.id;

    Post.create(post)
    .exec(function(err, newInstance) {
      if (err) return res.negotiate(err);


      // If we have the pubsub hook, use the model class's publish method
      // to notify all subscribers about the created item
      if (req._sails.hooks.pubsub) {
        if (req.isSocket) {
          Post.subscribe(req, newInstance);
          Post.introduce(newInstance);
        }
        console.log('publicou');
        Post.publishCreate(newInstance, !req.options.mirror && req);
      }


      res.send(201,newInstance);
    });
  },
  /*
  update: function(req, res){
    var post = {};
    var pk = req.param('id');
    post.body = req.param('body');
    post.sharedWith = req.param('sharedWith');

    console.warn(post, req.body);
    var Model = sails.models.post;

    Model.update(pk, post).exec(function updated(err, records) {
      if (err) return res.negotiate(err);

      var updatedRecord = records[0];

      if (req._sails.hooks.pubsub) {
        if (req.isSocket) { Model.subscribe(req, records); }
        Model.publishUpdate(pk, _.cloneDeep(post), !req.options.mirror && req, {
          previous: matchingRecord.toJSON()
        });
      }

      res.ok(populatedRecord);

    });

  }
  */
};
