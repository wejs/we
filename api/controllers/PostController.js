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
      //.populate('creator')
      .exec(function(err, posts) {
      // Error handling
      if (err) {
        return console.log(err);
        // TODO
      // Found multiple users!
      } else {
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
      .exec(function(error, newPost) {
      if (error) {
        sails.log.error('Error on post create:',error);
        return res.send(500, {error: res.i18n("Error") });
      }

      res.send(201,newPost);
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
