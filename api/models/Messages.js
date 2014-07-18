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

    // send to users and|or room
    toId: {
      type: 'array'
    },
    roomId: {
      type: 'array'
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
    next();
  },

  beforeUpdate: function(record, next) {
    // sanitize
    record = SanitizeHtmlService.sanitizeAllAttr(record);
    next();
  }

};
