/**
 * Membership.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {

    // requested | member | administrator | blocked
    status: {
      type: 'string',
      defaultsTo: 'requested'
    },

    user: {
      type: 'string'
    },

    group: {
      model: 'group',
    },

    // member | moderator | administrator
    // role: {
    //   type: 'string',
    //   defaultsTo: 'member'
    // }
  }

};
