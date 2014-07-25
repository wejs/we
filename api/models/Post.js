/**
 * Post
 *
 * @module      :: Model
 * @description :: Post model
 *
 */

module.exports = {
  schema: true,
  emberJsExcludeFromClient: true,
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
      model: 'user',
      required: true
    },

    // shared with users
    //sharedWith: {
    //  collection: 'user',
    //  via: 'sharedWithMe'
    //},
    // TODO find a better way to do this join with ember js configs
    sharedWith: {
      type: 'array'
    },

    // shared in groups
    sharedIn: {
      type: 'array'
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
      via: 'inPosts'
    },

    links: {
      type: 'array'
    },

    // Override toJSON instance method
    toJSON: function() {

      var obj = this.toObject();
      // set default objectType
      obj.objectType = "post";

      if( _.isString(obj.creator) ){
        obj.creator_id = obj.creator;
      } else if(_.isObject(obj.creator) && obj.creator.id) {
        obj.creator_id = obj.creator.id;
      }

      if( obj._comments ){
        obj.comments = obj._comments;
        delete obj._comments;
      }

      // set url for this content
      obj.url = "/post/" + obj.id;

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
        sails.log.error('PostModel:create: error on create Activity: ',error);
      }
      next();
    });

    NotificationService.setPostNotifications('post_created', post);
  }

};
