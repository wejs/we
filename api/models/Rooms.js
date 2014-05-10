/**
 * Rooms
 *
 * @module      :: Model
 * @description :: Rooms model
 *
 */

module.exports = {
  schema: true,
  attributes: {

    members_id: {
      type: 'array'
    },

    name: {
      type: 'string'
    },

    description: {
      type: 'string'
    },

    creator_id: {
      type: 'string',
      required: true
    }
  }

};
