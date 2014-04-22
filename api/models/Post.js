/**
 * Post
 *
 * @module      :: Model
 * @description :: Post model
 *
 */

module.exports = {

  attributes: {

    active:{
      type: 'boolean',
      defaultsTo: true
    },

    content: {
      type: 'url'
    },

    creator: {
      model: 'Users'
    },

    sharedWith: {
      type: 'array'
    },

    text: {
      type: 'string'
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
    }).then(function(error, activity) {
      // if has one error in activity creation, log it
      if (error) {
        sails.log.error('PostController:create: error on create Activity: ',error);
      }

      next();
    });
  }

};
