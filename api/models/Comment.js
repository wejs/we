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

    // model id where commeted to like post id, page id ... etc
    model_id: {
      type: 'string'
    },

    // model name where commeted to like Post, Page ... etc
    model_name: {
      type: 'string'
    },

    // comment text
    text: {
      type: 'string',
      required: true
    },

    // comment creator
    creator: {
      model:'users'
    },

    // comment parent, to replay one specific comment
    replyTo: {
      model:'comment',
      defaultsTo: null
    },

    // comment parent, to replay one specific comment
    replys: {
      collection: 'comment',
      via: 'replyTo'
    },

    // Override toJSON instance method
    toJSON: function() {
      // remove password
      var obj = this.toObject();

      // set default objectType
      obj.objectType = "comment";

      // set creator_id
      if(  _.isString(obj.creator) ){
        obj.creator_id = obj.creator;
      }else if(_.isObject(obj)){
        obj.creator_id = obj.creator.id;
      }

      // set url for this content
      obj.url = "/comment/" + obj.id;

      return obj;
    }
  },

  // After create, register one activity
  afterCreate: function(comment, next) {
    Activity.create({
      title: 'new comment',
      actor: comment.creator_id,
      verb: 'comment',
      target_id: comment.id
    }).exec(function(error, activity) {
      // if has one error in activity creation, log it
      if (error) {
        sails.log.error('CommentModel:create: error on create Activity: ',error);
      }
      next();
    });
  },

  getTargetFromDb: function(comment, callback) {
    var model_name = comment.model_name.toLowerCase();

    sails.models[model_name].findOneById(comment.model_id).exec(function(err, commentTarget){
      if(err){
        return callback(err);
      }

      callback(null, commentTarget);

    });

  }

};
