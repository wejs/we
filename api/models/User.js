/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

// bcrypt for password encrypt
var bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;


module.exports = {
  schema: true,
  attributes: {

    username: {
      type: 'string'
    },

    biography: {
      type: 'text'
    },

    email: {
      type: 'email', // Email type will get validated by the ORM
      required: true,
      unique: true
    },

    password: {
      type: 'string'
    },

    displayName: {
      type: 'string'
    },

    birthDate: 'date',

    image: {
      type: 'string'
    },

    avatarId: {
      type: 'string'
    },

    avatar: {
      model: 'images'
    },

    active: {
      type: 'boolean',
      defaultsTo: false
    },

    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },

    isModerator: {
      type: 'boolean',
      defaultsTo: false
    },

    language: {
      type: 'string',
      defaultsTo: 'en-us',
      maxLength: 6
    },

    // user configs
    configs: {
      model: 'configuration'
    },

    // shared with users
    SharedWithMe: {
      collection: 'post',
      via: 'sharedWith'
    },

    // Override toJSON instance method
    // to remove password value
    toJSON: function() {

      var obj = this.toObject();

      if(!obj.name){
        obj.name = obj.username;
      }

      if(!obj.displayName){
        obj.displayName = obj.username;
      }

      // remove password hash from view
      delete obj.password;

      // delete and hide user email
      delete obj.email;

      // set default objectType
      obj.objectType = 'person';

      return obj;
    },

    verifyPassword: function (password) {
      // if user dont have a password
      if(!this.password){
        return false;
      }

      var isMatch = bcrypt.compareSync(password, this.password);
      return isMatch;
    },

    changePassword: function(user, oldPassword, newPassword, next){
      user.updateAttribute( 'password', newPassword , function (err) {
        console.log('travo');
        if (!err) {
            next();
        } else {
            next(err);
        }
      });
    },
  },

  // Lifecycle Callbacks
  beforeCreate: function(user, next) {
    // sanitize
    user = SanitizeHtmlService.sanitizeAllAttr(user);

    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
      user.password = hash;
      next(err);
    });
  },

  beforeUpdate: function(user, next) {
    // sanitize
    user = SanitizeHtmlService.sanitizeAllAttr(user);

    // if has user.newPassword generate the new password
    if(user.newPassword){
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) { return next(err); }

        // hash the password along with our new salt
        bcrypt.hash(user.newPassword, salt, function(err, crypted) {
          if(err) { return next(err); }

          // delete newPassword variable
          delete user.newPassword;
          // set new password
          user.password = crypted;

          next();
        });
      });
    }else{
      next();
    }
  },

};
