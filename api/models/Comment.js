/**
 * Comment
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  attributes: {

    active: {
      type: 'boolean',
      defaultsTo: true
    },

    // model id where commeted to like post, page ... etc
    model_id: {
      type: 'string'
    },

    comment: {
      type: 'string',
      required: true
    },

    creator_id: {
      type: 'string'
    },

    replyTo_id: {
      type: 'string'
    }
  }

};
