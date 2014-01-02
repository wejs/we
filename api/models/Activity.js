/**
 * Activity
 *
 * @module      :: Model
 * @description :: Activity model
 *
 */

module.exports = {

  attributes: {

    active:{
      type: 'boolean',
      defaultsTo: true
    },

    content: {
      type: 'url'
    },

    creator_id: {
      type: 'string'
    },

    sharedWith: {
      type: 'array'
    },

    text: {
      type: 'string'
    }
  }

};
