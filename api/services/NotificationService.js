

/**
 * Set notifications and salve on database
 * @param {string} type notification type: post_created , comment_created ...
 * @param {function} callback callback to return the result with callback( error, result)
 */
exports.setNotifications = function(type, callback){
  sails.warn('TODO setNotifications');

  callback();
};

exports.setPostNotifications = function(type, post, callback){

  NotificationService.getUsersFollowingPost('post',function(err, users){

    if(users){
      users.forEach(function(user){
        NotificationService.getUserEmailNotificationType(user, function(){

          var notification = {};

          notification.user = user.id;
          notification.post = post.id;
          notification.type = type;
          notification.emailNotificationType = '';

          Notification.create( notification ).exec(function(error, token) {
            if(error) return cb(error);

          });
        });

      });

    }
  });

  sails.warn('TODO setPostNotifications');

  callback();
};

exports.getUserEmailNotificationType = function(user, callback){
  Configuration.findByUser(user.id).exec(function(err, configs){
    if(err){
      sails.log.error('Error on get user configs',err);
      return callback(err, null);
    }
    if(configs){
      callback(null, configs.emailNotificationType);
    }else{
      callback();
    }
  });
};

exports.setCommentNotifications = function(type, comment, callback){
  sails.warn('TODO setCommentNotifications');


  callback();
};

exports.saveNotificationOnDb = function(notification, callback){
  sails.warn('TODO saveNotificationOnDb');

  callback();
};

exports.getUsersFollowingPost = function(post, callback){

  sails.warn('TODO getUsersFollowingContent');

  callback();
};

/**
 * Email notification object
 * @type {Object}
 */
exports.email = {
  getNotSendNotifications: function( callback){
    sails.warn('TODO getNotSendNotifications');

    callback();
  },

  setNotificationAsSend: function( notification, callback){
    sails.warn('TODO setNotificationAsSend');

    callback();
  },

};
