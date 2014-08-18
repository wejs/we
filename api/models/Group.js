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
      model: 'images'
    },

    creator: {
      type: 'string',
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

    posts: {
      collection: 'post',
      via: 'sharedIn'
    },
	},

  //-- Lifecycle Callbacks

  beforeCreate: function(record, next) {
    // sanitize
    record = SanitizeHtmlService.sanitizeAllAttr(record);
    next();
  },

  beforeUpdate: function(record, next) {
    // sanitize
    record = SanitizeHtmlService.sanitizeAllAttr(record);
    next();
  },

  // After register one create activity
  afterCreate: function(group, next) {
    // save creator membership
    Membership.create({
      user: group.creator,
      group: group.id,
      status: 'administrator'
    }).exec(function(error, m) {
      // if has one error in activity creation, log it
      if (error) {
        sails.log.error('GroupModel:create: error on create membership: ',error);
      }
      group.userMembership = m;
      next();
    });
  }
};