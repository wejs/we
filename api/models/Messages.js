/**
 * Messages
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {
    fromId: {
      type: 'string',
      required: true
    },
    toId: {
      type: 'array',
      required: true,
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
  }

};
