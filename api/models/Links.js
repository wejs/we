/**
 * Links
 *
 * @module      :: Model
 * @description :: Link content
 *
 */

module.exports = {
  schema: true,
  attributes: {

    active: 'boolean',

    url: {
        type: 'url'
    },

    name: {
        type: 'STRING'
    }
  }

};
