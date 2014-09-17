/**
 * Messages
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {
  schema: true,
  attributes: {
    fromId: {
      type: 'string',
      required: true
    },

    // send to user id
    toId: {
      type: 'string'
    },

    // room id used to send to multiples users
    roomId: {
      type: 'string'
    },

    content: {
      type: 'string',
      required: true
    },
    status: {
      type: 'string',
      defaultsTo: 'salved'
    },
    read: {
      type: 'boolean',
      defaultsTo: false
    }
  },
 //-- Lifecycle Callbacks

  beforeCreate: function(record, next) {
    // sanitize
    record = SanitizeHtmlService.sanitizeAllAttr(record);

    // set record status do salved
    if(record.status === 'sending') {
      record.status = 'salved';
    }

    next();
  },

  beforeUpdate: function(record, next) {
    // sanitize
    record = SanitizeHtmlService.sanitizeAllAttr(record);
    next();
  }

};
