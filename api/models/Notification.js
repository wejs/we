/**
 * Notification model
 *
 * @module      :: Model
 * @description :: Model to store user notifications before show or send to users
 *
 */

module.exports = {
  schema: true,
  attributes: {
    // user how will be notified
    user: {
      type: 'string',
      required: true
    },

    // id of the user how did the activity
    actor: {
      type: 'string'
    },

    model: {
      type: 'string',
      required: true
    },

    modelId: {
      type: 'string',
      required: true
    },

    action: {
      type: 'string',
      required: true
    },

    emailSend: {
      type: 'boolean',
      defaultsTo: false
    },

    // TODO implement group feature
    // group: {
    //   model: 'group'
    // },

    // Status: salved | unpublished | deleted ...
    status: {
      type: 'string',
      defaultsTo: 'salved'
    },

    read: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  // After create end one event
  afterCreate: function(record, next) {
    // emit one event to plug others we.js features
    sails.emit('we:model:notification:afterCreate', record);
    next();
  }
};
