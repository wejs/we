/**
 * Activity.js
 *
 * @description :: Activity based on activitystrea.ms: http://activitystrea.ms/specs/json/1.0/
 * @docs		:: http://activitystrea.ms/specs/json/1.0/
 */

module.exports = {
  schema: true,
	attributes: {
    active:{
      type: 'boolean',
      defaultsTo: true
    },
    // user how did the activity
    actor: {
      type: 'string'
    },

    // activity object type exemple: post, user, comment ...
    verb: {
      type: 'string'
    },

    // Ex.: created, updated, deleted, accepted, requested
    // extend activitystrea.ms pattern
    action: {
      type: 'string'
    },

    // sails.js associations
    post: {
      model: 'post',
      via: 'activities'
    },

    user: {
      type: 'string'
    },

    comment: {
      model: 'comment'
    },
    // Override toJSON instance method
    toJSON: function() {

      var obj = this.toObject();

      if( _.isObject(obj.actor) ){
        obj.actor_id = obj.actor.id;
      } else {
        obj.actor_id = obj.actor;
      }

      return obj;
    }

	},

  //-- Lifecycle Callbacks

  beforeCreate: function(record, next) {
    // sanitize
    record = SanitizeHtmlService.sanitizeAllAttr(record);
    next();
  },

  beforeUpdate: function(record, next) {
    // sanitize
    record = SanitizeHtmlService.sanitizeAllAttr(record);
    next();
  },

  // After register one activity
  afterCreate: function(activity, next) {
    // TODO change to friends only
    //sails.io.sockets.in('user_activity_' + activity.actor).emit(
    if( _.isObject(activity.actor) ){
      activity.actor_id = activity.actor.id;
    } else {
      activity.actor_id = activity.actor;
    }

    //Activity.fetchData(activity, function(){
      sails.io.sockets.in('public').emit(
        'activity:new',
        {
          item: activity
        }
      );
    //});

    next();
  },
  /*
  fetchData: function(activity, callback){
    User.findOneById(activity.actor)
    .exec(function(err, dbActor) {
      if(err){
        sails.log.error('ActivityController:index: error on get actors: ',err);
        callback(err);
      }

      if(activity.actor){
        activity.actor = dbActor.toJSON();
      }

      // is a post activity get the target post
      if( activity.verb ){
        sails.models[activity.verb].findOneById(activity.target_id).exec(function(err, targetObject){
          if(err){
            sails.log.error('ActiviryController:index: erros on get targetObject from activity: ',activity, err);
            return callback(err);
          }

          // if dont targetObject is not found return a empty object
          if(!targetObject){
            activity.target = {};
            return callback();
          }

          // convert to json and set default variables
          targetObject = targetObject.toJSON();

          activity.target = targetObject;
          // set some Activity streams values
          if(targetObject.text){
            activity.target.displayName = targetObject.text;
          } else if(targetObject.comment) {
            activity.target.displayName = targetObject.comment;
          }

          callback();
        });
      }else{
        callback();
      }
    });
  }
  */
};
