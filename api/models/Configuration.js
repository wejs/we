/**
 * Configuration.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  emberJsExcludeFromClient: true,
	attributes: {

    // user how has this configuration
    user: {
      type: 'string'
    },

    // none | instant | daily | weekly
    emailNotificationType: {
      type: 'string',
      defaultsTo: 'none'
    }
  }

};
