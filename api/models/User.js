/**
 * User
 *
 * @module      :: Model
 * @description :: System User model
 *
 */

module.exports = {
  schema: true,
  attributes: {
    idInProvider: {
      type: 'string',
      unique: true
    },

    username: {
      type: 'string',
      unique: true,
      required: true,
      regex: /^[a-z0-9_-]{4,30}$/
    },

    email: {
      // Email type will get validated by the ORM
      type: 'email',
      required: true,
      unique: true
    },

    displayName: {
      type: 'string'
    },

    active: {
      type: 'boolean',
      defaultsTo: false
    },

    language: {
      type: 'string',
      defaultsTo: 'pt-br',
      maxLength: 6
    },

    toJSON: function() {
      var obj = this.toObject();
      if(!obj.displayName){
        obj.displayName = obj.username;
      }
      // delete and hide user email
      delete obj.email;
      // ember data type
      obj.type = 'user';

      return obj;
    }
  },

    // Lifecycle Callbacks
  beforeCreate: function(user, next) {
    // never save consumers on create
    delete user.consumers;
    // sanitize
    user = SanitizeHtmlService.sanitizeAllAttr(user);

    next();
  },

  beforeUpdate: function(user, next) {
    // sanitize
    user = SanitizeHtmlService.sanitizeAllAttr(user);
    next();
  },

  // custom find or create for oauth
  customFindORCreate: function(criteria, data, done) {
    User.findOne(criteria).exec(function(err, user) {
      if (err) return done(err);
      if (user) return done(null, user);
      User.create(data).exec(done);
    });
  }
};