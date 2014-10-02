/**
 * Post
 *
 * @module      :: Model
 * @description :: Post model
 *
 */

var S = require('string');

module.exports = {
  schema: true,
  attributes: {

    active:{
      type: 'boolean',
      defaultsTo: true
    },
    // post content
    body: {
      type: 'text',
      required: true
    },
    // body without tags
    bodyClean: {
      type: 'text'
    },
    // body small body text version or description
    bodyTeaser: {
      type: 'text'
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

      // set content type
      if( obj.wembed ) {
        obj.contentType = 'wembed';
      } else if(obj.images){
        obj.contentType = 'image';
      } else {
        obj.contentType = 'text';
      }

      // set url for this content
      obj.url = '/post/' + obj.id;

      return obj;
    }
  },

  //-- Lifecycle Callbacks

  beforeCreate: function(post, next) {
    var originalBody = post.body;
    // sanitize
    post = SanitizeHtmlService.sanitizeAllAttr(post);
    // create one tag clean text version
    post.bodyClean = S(originalBody).stripTags().s;
    // small teaser text
    post.bodyTeaser = post.bodyClean.substr(0, 30);
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
    // emit one event to plug others we.js features
    sails.emit('we:model:post:afterCreate', post);
    next();
  },

  loadPostImageAndComments: function (post, callback){
    Post.findOne({id: post.id})
    .populate('images')
    .populate('sharedIn')
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
