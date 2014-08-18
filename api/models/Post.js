/**
 * Post
 *
 * @module      :: Model
 * @description :: Post model
 *
 */

module.exports = {
  schema: true,
  attributes: {

    active:{
      type: 'boolean',
      defaultsTo: true
    },
    // post content
    body: {
      type: 'string',
      required: true
    },

    creator: {
      type: 'string',
      required: true
    },

    // shared with users
    sharedWith: {
      type: 'array'
    },
    // TODO find a better way to do this join with ember js configs
    // sharedWith: {
    //   type: 'array'
    // },

    // shared in groups
    sharedIn: {
      collection: 'group',
      via: 'posts',
      dominant: true
    },

    comments: {
      collection: 'comment',
      via: 'post'
    },

    activities: {
      collection: 'activity',
      via: 'post'
    },

    videos: {
      type: 'array'
    },

    images: {
      collection: 'images',
      via: 'inPost'
    },

    links: {
      type: 'array'
    },

    sharedUrl: {
      type: 'string'
    },

    wembed: {
      model: 'wembed'
    },

    // Override toJSON instance method
    toJSON: function() {

      var obj = this.toObject();
      // set default objectType
      obj.objectType = 'post';

      if( _.isString(obj.creator) ){
        obj['creator_id'] = obj.creator;
      } else if(_.isObject(obj.creator) && obj.creator.id) {
        obj['creator_id'] = obj.creator.id;
      }

      if( obj._comments ){
        obj.comments = obj._comments;
        delete obj._comments;
      }

      // set url for this content
      obj.url = '/post/' + obj.id;

      return obj;
    }
  },

  //-- Lifecycle Callbacks

  beforeCreate: function(post, next) {
    // sanitize
    post = SanitizeHtmlService.sanitizeAllAttr(post);
    next();
  },

  beforeUpdate: function(post, next) {
    // dont update post.comments in post.update
    delete post.comments;
    // sanitize
    post = SanitizeHtmlService.sanitizeAllAttr(post);
    next();
  },

  // After register one create activity
  afterCreate: function(post, next) {
    Activity.create({
      actor: post.creator,
      verb: 'post',
      post: post.id
    }).exec(function(error, activity) {
      // if has one error in activity creation, log it
      if (error) {
        sails.log.error('PostModel:create: error on create Activity: ',error,activity);
      }
      next();
    });

    NotificationService.setPostNotifications('post_created', post);
  },

  loadPostImageAndComments: function (post, callback){
    Post.findOne({id: post.id})
    .populate('images')
    //.populate('creator')
    //.populate('comments', { limit: 2, sort: 'createdAt asc' })
    .exec( function( err, postPopulated){
      if(err){
        sails.log.error('erro on find and populate post', err, post);
        callback(err);
      }

      //fetch metadata and some comments for every post
      Comment.getCommentsAndCount(postPopulated.id, function(err, comments, commentCount){
        if (err) {
          sails.log.error('loadPostImageAndComments:error on Comment.getCommentsAndCount', err,postPopulated);
          return callback(err, postPopulated);
        }

        postPopulated.meta = {};
        postPopulated.meta.commentCount = commentCount;
        postPopulated._comments = [];

        postPopulated._comments = comments.reverse();

        callback(err, postPopulated);

      });
    })
  }
};
