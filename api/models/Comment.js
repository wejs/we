/**
 * Comment
 *
 * @module      :: Model
 * @description :: Model comentary
 *
 */

module.exports = {
  schema: true,
  attributes: {

    // active or disable, like published or unpublished
    active: {
      type: 'boolean',
      defaultsTo: true
    },

    // comment text
    body: {
      type: 'string',
      required: true
    },

    // comment creator
    creator: {
      model:'user'
    },

    post: {
      model: 'post',
      via: 'comments'
    },

    activities: {
      collection: 'activity',
      via: 'comment'
    },

    // comment parent, to replay one specific comment
    /*
    replyTo: {
      model:'comment',
      defaultsTo: null
    },

    // comment parent, to replay one specific comment
    replys: {
      collection: 'comment',
      via: 'replyTo'
    },
    */
    // Override toJSON instance method
    toJSON: function() {
      // remove password
      var obj = this.toObject();

      // set default objectType
      obj.objectType = "comment";

      // set creator_id
      if(  _.isString(obj.creator) ){
        obj.creator_id = obj.creator;
      }else if(_.isObject(obj.creator) && obj.creator.id){
        obj.creator_id = obj.creator.id;
      }

      // set url for this content
      obj.url = "/comment/" + obj.id;

      return obj;
    }
  },

  // After create, register one activity
  afterCreate: function(comment, next) {
    // register one activity on create
    Activity.create({
      actor: comment.creator.id,
      verb: 'comment',
      comment: comment.id,
      post: comment.post
    }).exec(function(error, activity) {
      // if has one error in activity creation, log it
      if (error) {
        sails.log.error('CommentModel:create: error on create Activity: ',error);
      }

      next();
    });
  }

};
