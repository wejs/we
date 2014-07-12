/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
	attributes: {
    name: {
      type: 'string',
      required: true
    },

    // group | cource
    type: {
      type: 'string',
      defaultsTo: 'group'
    },

    logo: {
      type: 'images'
    },

    creator: {
      model: 'user',
      required: true
    },

    // public | restrict | private | hidden
    privacity: {
      type: 'string',
      defaultsTo: 'public'
    },

    active:{
      type: 'boolean',
      defaultsTo: true
    },
	}

};
