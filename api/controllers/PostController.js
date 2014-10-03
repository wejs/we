/**
 * PostController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var util = require('util');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');

module.exports = {

  findOneRecord: function findOneRecord (req, res) {

    var Model = actionUtil.parseModel(req);
    var pk = actionUtil.requirePk(req);
    var modelName = req.options.model || req.options.controller;

    var query = Model.findOne(pk);
    //query = actionUtil.populateEach(query, req.options);
    query.populate('comments')
    .exec(function found(err, matchingRecord) {
      if (err) return res.serverError(err);
      if(!matchingRecord) return res.notFound('No record found with the specified `id`.');

      var resultObject = {};

      resultObject[modelName] = matchingRecord;
      res.send(resultObject);
    });

  },


  list: function list(req,res) {

    Post.find()
    .where( actionUtil.parseCriteria(req) )
    .limit( 10 )
    .skip( actionUtil.parseSkip(req) )
    .sort('updatedAt DESC')
    .populate('images')
    .populate('wembed')
    .populate('sharedIn')
    // TODO params in populate comment dont are working well, fix it!
    //.populate('comments', { limit: 2, sort: 'createdAt asc' })
    .exec(function(err, posts) {
      if (err) { return res.serverError(err); }
        var meta = {};

        //fetch metadata and some comments for every post
        async.each(posts, function(post, nextPost){
          Comment.getCommentsAndCount(post.id, function(err, comments, commentCount){
            if (err) { return res.serverError(err); }

            post.meta = {};
            post.meta.commentCount = commentCount;
            post._comments = [];

            post._comments = comments.reverse();

            nextPost();
          });

        },function(){
            // if are in a socket.io request
            if (req._sails.hooks.pubsub && req.isSocket) {
              // subscribe for updates
              Post.subscribe(req, posts);
              // Also subscribe to instances of all associated models
              _.each(posts, function (record) {
                actionUtil.subscribeDeep(req, record);
              });
            }

            res.send({
              post: posts,
              meta: meta
            });
        });
    });
  },

  createRecord: function createRecord(req, res) {

    var Model = Post;

    // Create data object (monolithic combination of all parameters)
    // Omit the blacklisted params (like JSONP callback param, etc.)
    var data = actionUtil.parseValues(req);

    // Create new instance of model using data from params
    Model.create(data).exec(function created (err, newRecord) {

      // Differentiate between waterline-originated validation errors
      // and serious underlying issues. Respond with badRequest if a
      // validation error is encountered, w/ validation info.
      if (err) return res.negotiate(err);

      Model.findOne(newRecord[Model.primaryKey])
        .populate('images')
        .populate('sharedIn')
      .exec(function found(err, newInstance) {

        if (err) return res.serverError(err);
        if (!newInstance) return res.notFound();

        // If we have the pubsub hook, use the model class's publish method
        // to notify all subscribers about the created item
        if (req._sails.hooks.pubsub) {
          if (req.isSocket) {
            Model.subscribe(req, newInstance);
            Model.introduce(newInstance);
          }

          if ( newRecord.creator ) {
            // send the change to others user connected devices
            sails.io.sockets.in('user_' + newRecord.creator).emit(
              'post', {
                id: newInstance.id,
                verb: 'created',
                data: newInstance
              }
            );
          }
        }

        NotificationService.setPostNotifications('post', 'created', newInstance, req.user);

        // Send JSONP-friendly response if it's supported
        // (HTTP 201: Created)

        res.status(201);
        res.ok({ post: newInstance});
      });

    });
  },

  update: function updateOneRecord (req, res) {

    // Look up the model
    var Model = Post;

    // Locate and validate the required `id` parameter.
    var pk = actionUtil.requirePk(req);

    // Create `values` object (monolithic combination of all parameters)
    // But omit the blacklisted params (like JSONP callback param, etc.)
    var values = actionUtil.parseValues(req);

    // Omit the path parameter `id` from values, unless it was explicitly defined
    // elsewhere (body/query):
    var idParamExplicitlyIncluded = ((req.body && req.body.id) || req.query.id);
    if (!idParamExplicitlyIncluded) delete values.id;

    delete values.createdAt;
    delete values.updatedAt;

    // Find and update the targeted record.
    //
    // (Note: this could be achieved in a single query, but a separate `findOne`
    //  is used first to provide a better experience for front-end developers
    //  integrating with the blueprint API.)
    Model.findOne(pk).populateAll().exec(function found(err, matchingRecord) {

      if (err) return res.serverError(err);
      if (!matchingRecord) return res.notFound();

      Model.update(pk, values).exec(function updated(err, records) {

        // Differentiate between waterline-originated validation errors
        // and serious underlying issues. Respond with badRequest if a
        // validation error is encountered, w/ validation info.
        if (err) return res.negotiate(err);


        // Because this should only update a single record and update
        // returns an array, just use the first item.  If more than one
        // record was returned, something is amiss.
        if (!records || !records.length || records.length > 1) {
          req._sails.log.warn(
          util.format('Unexpected output from `%s.update`.', Model.globalId)
          );
        }

        var updatedRecord = records[0];

        // If we have the pubsub hook, use the Model's publish method
        // to notify all subscribers about the update.
        if (req._sails.hooks.pubsub) {
          if ( updatedRecord.creator ) {
            // send the change to others user connected devices
            sails.io.sockets.in('follow_user_' + updatedRecord.creator).emit(
              'post', {
                id: updatedRecord.id,
                verb: 'created',
                data: updatedRecord
              }
            );
          }
        }
        // Do a final query to populate the associations of the record.
        //
        Model.findOne(updatedRecord[Model.primaryKey])
          .populate('images')
          .populate('sharedIn')
        .exec(function found(err, populatedRecord) {
          if (err) return res.serverError(err);
          if (!populatedRecord) return res.serverError('Could not find record after updating!');

            res.ok({post: populatedRecord});
        }); // </foundAgain>

      });// </updated>
    }); // </found>
  }
};
