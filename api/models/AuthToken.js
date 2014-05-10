/**
 * AuthToken
 *
 * @module      :: Model
 * @description :: Auth Token model for create login, password and activate account tokens
 *
 */
var uuid = require('node-uuid');

module.exports = {
  schema: true,
  attributes: {

    token: {
      type: 'string'
    },

    user_id: {
      type: 'string',
      required: true
    }
  },

  beforeCreate: function(token, next) {
    token.token = uuid.v1();
    next();
  }

};
