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
    user: {
      type: 'string'
    },

    post: {
      model: 'post'
    },

    comment: {
      model: 'comment'
    },

    // new_post | new_comment | friend_request ...
    type: {
      type: 'string',
      required: true
    },

    // none | instant | daily | weekly
    emailNotificationType: {
      type: 'string',
      defaultsTo: 'none'
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
  }

};
