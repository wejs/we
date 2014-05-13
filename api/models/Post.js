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

    content: {
      type: 'url'
    },

    creator: {
      model: 'users'
    },

    sharedWith: {
      type: 'array'
    },

    text: {
      type: 'string'
    },
    // Override toJSON instance method
    toJSON: function() {

      var obj = this.toObject();

      // set default objectType
      obj.objectType = "post";

      if( _.isObject(obj.creator) ){
        obj.creator_id = obj.creator.id;
      } else {
        obj.creator_id = obj.creator;
      }

      // set url for this content
      obj.url = "/post/" + obj.id;

      return obj;
    }
  },

  //-- Lifecycle Callbacks

  // After register one activity
  afterCreate: function(post, next) {
    Activity.create({
      title: 'New post',
      actor: post.creator,
      verb: 'post',
      target_id: post.id
    }).exec(function(error, activity) {
      // if has one error in activity creation, log it
      if (error) {
        sails.log.error('PostModel:create: error on create Activity: ',error);
      }

      next();
    });
  }

};
