/**
 * Contact.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
	attributes: {

    // user how send the request
    from: {
      type: 'string',
      required: true
    },

    to: {
      type: 'string',
      required: true
    },

    // requested | accepted| ignored
    // requestsToYou
    status: {
      type: 'string',
      defaultsTo: 'requested',
      'in': ['requested', 'accepted', 'ignored']
    }
	},

  // Lifecycle Callbacks
  beforeCreate: function(record, next) {
    // on create status will be requested
    record.status = 'requested';
    next();
  },

  // beforeUpdate: function(record, next) {
  // },

  /**
   * Get user contact relationship
   * @param  {string}   uid      user id to get contacts use for logged in user
   * @param  {string}   contact_id      contact id
   * @param  {function} callback  after done exec with callback(error,contact)
   */
  getUsersRelationship: function getUsersRelationship(uid, contact_id, callback){
    Contact.findOne()
    .where({
      or: [{
        from: uid,
        to: contact_id
      },{
        from: contact_id,
        to: uid
      }]
    })
    .exec(function (err, contact) {
      if(err) return callback(err, null);
      // no relationship found
      if(!contact) return callback();
      // if request is to user uid
      if(contact.status === 'requested' && contact.to === uid){
        contact.status = 'requestsToYou';
      }
      callback(err, contact);
    });
  },

  /**
   * Get user contacts with user id
   * @param  {string}   uid      user id to get contacts
   * @param  {function} callback  after done exec with callback(error,contacts)
   */
  getUserContacts: function getUserContacts(uid, callback){
    Contact.find()
    .where({
      or: [{
        from: uid,
      },{
        to: uid
      }]
    })
    .exec(function(err, contacts){
      callback(err,contacts);
    });
  }
};
