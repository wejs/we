

/**
 * Set notifications and salve on database
 * @param {string} type notification type: post_created , comment_created ...
 * @param {function} callback callback to return the result with callback( error, result)
 */
exports.setNotifications = function(type, callback){
  sails.log.warn('TODO setNotifications');

  callback();
};

exports.setPostNotifications = function(type, post){
  sails.log.warn('post', post);

  /* post example:
  { body: '<p>teste</p>',
  createdAt: Mon Jun 23 2014 04:00:18 GMT-0300 (BRT),
  updatedAt: Mon Jun 23 2014 04:00:18 GMT-0300 (BRT),
  active: true,
  creator: '53814d02e2c88c4f4937079a',
  sharedWith: [ '537c449a23b0b9cc2f5d9a7a', '538160a7e7dd93384f988a13' ],
  id: '53a7d082403f1340049fe09a' }
   */

  // shared with you notification
  NotificationService.getUsersFromSharedWithField(post, function(error, users){
    if(error){
      sails.log.error('Error on setPostNotifications getUsersFromSharedWithField', error);
    }else if(users){
      users.forEach(function(user){
        // create one notification for every user
        NotificationService.getUserEmailNotificationType(user, function(error, emailNotificationType){
          if(error){
            return sails.log.error('Error on setPostNotifications getUserEmailNotificationType', error);
          }

          var notification = {};
          notification.user = user.id;
          notification.post = post.id;
          notification.type = 'postCreatedSharedWithMe';
          notification.emailNotificationType = emailNotificationType;

          Notification.create( notification ).exec(function(error, notification) {
            if(error){
              return sails.log.error('Error on getUsersFromSharedWithField Notification.create', error);
            }
          });

        });

      });

    }
  });

  sails.log.warn('TODO setPostNotifications');
};

exports.post = {
  getUsersToNotify: function(post, callback){

    NotificationService.getUsersFromSharedWithField(post, function(err, sharedWith){
      NotificationService.getUsersFollowingPost(post,function(err, users){

        callback(null, users);

      });
    });

  }
};

exports.getUsersFromSharedWithField = function(post, callback){

  if(post.sharedWith && post.sharedWith.length > 0){
    User.find()
    .where({
      id: post.sharedWith,
      active: true
    })
    .exec(function(err, users){
      if(err){
        sails.log.error('Error on getUsersFromSharedWithField ',err);
        return callback(err,null);
      }

      callback(null, users);
    });
  }else{
    callback(null, []);
  }

};

exports.getUserEmailNotificationType = function(user, callback){
  // if has user config prepopulated
  if(user.configs){
    if(user.configs.emailNotificationType){
      return callback(null, user.configs.emailNotificationType);
    }else{
      return callback(null,'none');
    }
  }

  // else get user configs from db
  Configuration.find()
  .where({
    user: user.id
  })
  .exec(function(err, configs){
    if(err){
      sails.log.error('Error on get user configs',err);
      return callback(err, null);
    }
    if(configs && configs.emailNotificationType){
      callback(null, configs.emailNotificationType);
    }else{
      callback(null, 'none');
    }
  });
};

exports.setCommentNotifications = function(type, comment, callback){
  sails.log.warn('TODO setCommentNotifications');


  callback();
};

exports.saveNotificationOnDb = function(notification, callback){
  sails.log.warn('TODO saveNotificationOnDb');

  callback();
};

exports.getUsersFollowingPost = function(post, callback){

  sails.log.warn('TODO getUsersFollowingContent');

  callback(null, []);
};

/**
 * Email notification object
 * @type {Object}
 */
exports.email = {
  getNotSendNotifications: function( callback){
    sails.log.warn('TODO getNotSendNotifications');

    callback();
  },

  setNotificationAsSend: function( notification, callback){
    sails.log.warn('TODO setNotificationAsSend');

    callback();
  },

};
