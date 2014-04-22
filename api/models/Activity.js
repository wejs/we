/**
 * Activity.js
 *
 * @description :: Activity based on activitystrea.ms: http://activitystrea.ms/specs/json/1.0/
 * @docs		:: http://activitystrea.ms/specs/json/1.0/
 */

module.exports = {

	attributes: {
    active:{
      type: 'boolean',
      defaultsTo: true
    },

    title: {
      type: 'string'
    },

    actor: {
      type: 'string'
    },

    // activity object type exemple: post, user, comment ...
    verb: {
      type: 'string'
    },

    target_id: {
      type: 'string'
    }
	},
  // After register one activity
  afterCreate: function(activity, next) {
    // TODO change to friends only
    //sails.io.sockets.in('user_activity_' + activity.actor).emit(
    sails.io.sockets.in('public').emit(
      'activity:new',
      {
        item: activity
      }
    );

    next();
  }
};
