/**
 * Roles
 *
 * @module      :: Model
 * @description :: Role model
 *
 */

module.exports = {
  schema: true,
  attributes: {

    name: {
      type: 'string',
      required: true

    },

    description: {
      type: 'string'
    },

    roles: {
      type: 'array',
    }
  }

};
