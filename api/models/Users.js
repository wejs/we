/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

// bcrypt for password encrypt
var bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;


module.exports = {

  attributes: {
    // Or for more flexibility:
    // phoneNumber: {
    //    type: 'STRING',
    //    defaultsTo: '555-555-5555'
    // }

    username: {
        type: 'STRING'
    },

    email: {
      type: 'email', // Email type will get validated by the ORM
      required: true,
      unique: true
    },

    password: {
        type: 'STRING'
    },

    name: {
        type: 'STRING'
    },

    birthDate: 'DATE',

    avatarId: {
        type: 'STRING'
    },

    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },

    isModerator: {
      type: 'boolean',
      defaultsTo: false
    },

    // Override toJSON instance method
    // to remove password value
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },

    // Password functions
    setPassword: function (password, done) {
        var _this = this;

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return done(err);

            // hash the password along with our new salt
            bcrypt.hash(password, salt, function(err, crypted) {
                _this.cryptedPassword = crypted;
                done();
            });
        });
    },

    verifyPassword: function (password) {
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

    // Create new user password affter create
    bcrypt.hash(user.password, 10, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  },

  findOrCreate: function (data, done) {

    /* GITHUB */
    if (data.githubId) {
        User.findOne({ 'githubId': data.githubId }, function (err, user) {
            if (user) return done(err, user);
            User.create({
                githubId: data.githubId,
                displayName: data.profile.displayName || data.profile.username
            }, done);
        });
    } else

    /* GOOGLE OPENID */
    if (data.openId) {

        var email = data.profile.emails[0].value;

        User.findOne({ $or: [ {'googleId': data.openId}, {'email': email } ] }, function (err, user) {
            if(!user.googleId){
                user.googleId = data.openId;
            }

            if (user) return done(err, user);
            User.create({
                displayName: data.profile.displayName,
                email: data.profile.emails[0].value,
                googleId: data.openId
            }, done);
        });
    } else

    /* LINKEDIN */
    if (data.linkedinId) {
        User.findOne({ 'linkedinId': data.linkedinId }, function (err, user) {
            if (user) return done(err, user);
            User.create({
                displayName: data.profile.displayName,
                linkedinId: data.linkedinId
            }, done);
        });
    } else

    /* LOCAL */
    if (data.email) {
        User.findOne({ 'email': data.email }, function (err, user) {
            if (user) return done(err, user);
            if (!user) return done(err);
        });
    } else

    /* SOMETHING NOT KNOWN YET */
    {
        console.log(data.profile);
    }
  }
};
