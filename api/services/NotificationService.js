
sails.on('we:model:post:afterCreate', function(post) {
  notificator.setPostNotifications('post', 'created', post, post.creator);
});

sails.on('we:model:notification:afterCreate', function(record) {
  sails.log.warn('>>>>', record);
  sails.io.sockets.in('user_' + record.user).emit(
    'notification',
    {
      id: record.id,
      verb: 'created',
      data: record
    }
  );
});

var notificator = {};

notificator.notify = function notify(type, user, data, callback) {
  // make callback optional
  if(!callback) callback = function(){};

  switch(type){
    case 'contact_requested':
      // send one socket.io notification
      sails.io.sockets.in('user_'+data.to).emit('contact:requested', data);
      sails.log.debug('TODO! send contact_requested notification!',type,data);
      break;
    case 'contact_accepted':
      // send one socket.io notification
      sails.io.sockets.in('user_'+data.from).emit('contact:accepted', data);
      sails.log.debug('TODO! send contact_accepted notification!',type,data);
      break;
    case 'contact_ignored':
      // send one socket.io notification
      sails.io.sockets.in('user_'+data.from).emit('contact:ignored', data);
      sails.log.debug('TODO! send contact_ignored notification!',type,data);
      break;
    case 'contact_deleted':
      // send one socket.io notification
      sails.io.sockets.in('user_'+data.to).emit('contact:deleted', data);
      sails.io.sockets.in('user_'+data.from).emit('contact:deleted', data);
      sails.log.debug('TODO! send contact_deleted notification!',type,data);
      break;
    default:
      sails.log.warn('notification type not found:',type);
  }

  sails.log.info('TODO! notify', type, data);

};
/*
acceptContact
ignoreContact
deleteContact
 */

/**
 * Set notifications and salve on database
 * @param {string} type notification type: post_created , comment_created ...
 * @param {function} callback callback to return the result with callback( error, result)
 */
notificator.setNotifications = function(type, callback){
  sails.log.warn('TODO setNotifications');

  callback();
};

notificator.setPostNotifications = function(model, action, post, actorId){
  sails.log.warn('setPostNotifications', model, action, post, actorId);

  notificator.getUsersToNotify('post', action, post, actorId, function result(err, users) {
    if (err) {
      return sails.log.error('Error on notificator.getUsersToNotify',err);
    }

    // if has users to notify ...
    if (users) {
      users.forEach( function(user) {
        Notification.create({
          user: user.userId,
          model: model,
          modelId: post.id,
          action: action,
          actor: actorId
        })
        .exec(function(error) {
          if (error) {
            return sails.log.error('Error on getUsersFromSharedWithField Notification.create', error);
          }
        });
      });
    }
  });

  /* post example:
  { body: '<p>teste</p>',
  createdAt: Mon Jun 23 2014 04:00:18 GMT-0300 (BRT),
  updatedAt: Mon Jun 23 2014 04:00:18 GMT-0300 (BRT),
  active: true,
  creator: '53814d02e2c88c4f4937079a',
  sharedWith: [ '537c449a23b0b9cc2f5d9a7a', '538160a7e7dd93384f988a13' ],
  id: '53a7d082403f1340049fe09a' }
   */

  // // shared with you notification
  // NotificationService.getUsersFromSharedWithField(post, function(error, users) {
  //   if (error) {
  //     sails.log.error('Error on setPostNotifications getUsersFromSharedWithField', error);
  //   } else if(users) {
  //     users.forEach( function(user) {
  //       // create one notification for every user
  //       NotificationService.getUserEmailNotificationType(user, function(error, emailNotificationType) {
  //         if (error) {
  //           return sails.log.error('Error on setPostNotifications getUserEmailNotificationType', error);
  //         }

  //         var notification = {};
  //         notification.user = user.id;
  //         notification.post = post.id;
  //         notification.type = 'postCreatedSharedWithMe';
  //         notification.emailNotificationType = emailNotificationType;

  //         Notification.create( notification ).exec(function(error, notification) {
  //           if (error) {
  //             return sails.log.error('Error on getUsersFromSharedWithField Notification.create', error);
  //           }
  //         });
  //       });
  //     });
  //   }
  // });

};

notificator.getUsersToNotify = function(modelName, action, model, actorId, callback){
  var usersToNotify = [];

  var queryGetters = [];

  // on create dont get model followers
  if ( action !== 'created') {
    // users following the content
    queryGetters.push(function(cb) {
      Follow.getUsersFollowing(modelName, model.id)
      .exec(function(err, users){
        if(err) return cb(err);
        return cb(null, users);
      });
    });
  }

  // users following the content creator
  queryGetters.push(function(cb) {
    // TODO skip creator
    // users following the creator
    Follow.getUsersFollowing('user', model.creator)
    .exec(function(err, users){
      if(err) return cb(err);
      return cb(null, users);
    });
  });

  // run query with assync
  async.parallel(queryGetters,
  // optional callback
  function(err, results){
    if (err) {
      return callback(err, null);
    }

    // for each result
    for (var i = results.length - 1; i >= 0; i--) {
      // for each user
      for (var j = results[i].length - 1; j >= 0; j--) {
        usersToNotify.push(results[i][j]);
      }
    }

    callback(null, usersToNotify);
  });

};

notificator.getUsersFromSharedWithField = function(post, callback){
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

notificator.getUserEmailNotificationType = function(user, callback){
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

notificator.setCommentNotifications = function(type, comment, callback){
  sails.log.warn('TODO setCommentNotifications');

  callback();
};

notificator.saveNotificationOnDb = function(notification, callback){
  sails.log.warn('TODO saveNotificationOnDb');

  callback();
};

notificator.getUsersFollowingPost = function(post, callback){

  sails.log.warn('TODO getUsersFollowingContent');

  callback(null, []);
};

/**
 * Email notification object
 * @type {Object}
 */
notificator.email = {
  getNotSendNotifications: function( callback){
    sails.log.warn('TODO getNotSendNotifications');

    callback();
  },

  setNotificationAsSend: function( notification, callback){
    sails.log.warn('TODO setNotificationAsSend');

    callback();
  }
};

module.exports = notificator;
