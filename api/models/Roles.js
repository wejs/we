/**
 * Roles
 *
 * @module      :: Model
 * @description :: Role model
 *
 */

module.exports = {

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
