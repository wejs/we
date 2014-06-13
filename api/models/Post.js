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
      type: 'string'
    },

    creator: {
      model: 'user'
    },

    sharedWith: {
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

      // set url for this content
      obj.url = "/post/" + obj.id;

      return obj;
    }
  },

  //-- Lifecycle Callbacks

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
  }

};
