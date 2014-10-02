
sails.on('we:model:notification:afterCreate', function(record) {

  var recordsRelated = {};

  record = Notification.customToJSON(record);

  User.findOne({
    idInProvider: record.user
  })
  .exec(function(err, user){
    if ( err ) {
      return sails.log.error('Error on send push notification to user', err, record);
    }

    var locale = user.language;
    if (!locale) {
      locale = sails.config.i18n.defaultLocale;
    }

    Notification.fetchNotificationData(locale, record, recordsRelated, function() {
      recordsRelated['notification'] = record;
      sails.io.sockets.in('user_' + record.user).emit(
        'notification',
        {
          id: record.id,
          verb: 'created',
          data: record
        }
      );
    });
  })

});

var notificator = {};

notificator.notify = function notify(type, user, data, callback) {
  // make callback optional
  if(!callback) callback = function(){};

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


notificator.notifyContactRequest = function(contactModel, from) {
  // load from user
  User.findOne({
    idInProvider: contactModel.to
  })
  .exec(function(err, to){
    if (err) {
      return sails.log.error('notifyContactRequest:Error on get from user',err, contactModel);
    }

    if (!from || !to) {
      return;
    }

    var locale = to.language;
    if (!locale) {
      locale = sails.config.i18n.defaultLocale;
    }

    var newNotification = {
      user: contactModel.to,
      model: 'contact',
      modelId: contactModel.id,
      action: 'requested',
      actor: from.id,

      locale: locale,

      targetModelType: 'user',
      targetModelId: from.id,
      displayName: from.displayName
    }

    Notification.create(newNotification)
    .exec(function(error) {
      if (error) {
        return sails.log.error('Error on notifyContactRequest Notification.create', error);
      }
    });
  })
}

notificator.notifyContactAccept = function(contactModel, to) {
  // load from user
  User.findOne({
    idInProvider: contactModel.from
  })
  .exec(function (err, from) {
    if (err) {
      return sails.log.error('notifyContactRequest:Error on get from user',err, contactModel);
    }

    if (!to || !from) {
      return;
    }

    var locale = from.language;
    if (!locale) {
      locale = sails.config.i18n.defaultLocale;
    }

    var newNotification = {
      user: contactModel.from,
      model: 'contact',
      modelId: contactModel.id,
      action: 'accepted',
      actor: to.id,

      locale: locale,

      targetModelType: 'user',
      targetModelId: to.id,
      displayName: to.displayName,
      groupName: null,
      groupId: null,
      contentType: null,
      relatedContentTeaser: null
    }

    Notification.create(newNotification)
    .exec(function(error) {
      if (error) {
        return sails.log.error('Error on notifyContactRequest Notification.create', error);
      }
    });
  })
}

notificator.setPostNotifications = function(model, action, post, actor){

  notificator.getUsersToNotify('post', action, post, actor.id , function result(err, users) {
    if (err) {
      return sails.log.error('Error on notificator.getUsersToNotify',err);
    }
    // if has users to notify ...
    if (users) {
      // populate post assoc data
      Post.findOne({id: post.id})
      .populate('sharedIn')
      .populate('wembed')
      .exec(function (err , postRecord) {
        if( err ) {
          return sails.log.error('Error on get populated post from DB ',err);
        }
        // set default post data
        postRecord = postRecord.toJSON();
        // for each user to notify ...
        users.forEach( function (user) {
          // dont notify user creator
          if ( user.userId === actor.idInProvider) {
            return;
          }

          var locale = user.language;
          if (!locale) {
            locale = sails.config.i18n.defaultLocale;
          }

          var newNotification = {
            user: user.userId,
            model: model,
            modelId: post.id,
            action: action,
            actor: actor.id,

            locale: locale,

            targetModelType: 'post',
            targetModelId: post.id,
            displayName: actor.displayName,
            contentType: postRecord.contentType,
            relatedContentTeaser: postRecord.bodyTeaser
          }

          if ( postRecord.sharedIn && postRecord.sharedIn[0] ) {
            newNotification.groupId = postRecord.sharedIn[0].id;
            newNotification.groupName = postRecord.sharedIn[0].name;
          }

          Notification.create(newNotification)
          .exec(function (error) {
            if (error) {
              return sails.log.error('Error on getUsersFromSharedWithField Notification.create', error);
            }
          });
        });

      })
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


notificator.setCommentNotifications = function(model, action, comment, actor) {
  // get related post
  Post.findOne({id: comment.post })
    .populate('sharedIn')
    .populate('wembed')
  .exec(function (err, commentedModel) {
    if (err) {
      return sails.log.error('Error on get post related to comment',err);
    }
    // do nothing if no post found
    if (!commentedModel) {
      sails.log.warn('Post related to comment not found', comment);
      return;
    }

    // set default data
    commentedModel = commentedModel.toJSON();

    // get users how are following the commented resource
    Follow.getUsersFollowing('post', commentedModel.id)
    .exec(function (err, users) {
      if (err) {
        return sails.log.error('Error on get Follow.getUsersFollowing for post related to comment',err);
      }

      if (!users) return;

      // for each user to notify ...
      users.forEach( function(user) {
        // dont notify user creator
        if ( user.userId === actor.idInProvider) {
          return;
        }

        var locale = user.language;
        if (!locale) {
          locale = sails.config.i18n.defaultLocale;
        }

        // small teaser text
        comment.bodyTeaser = comment.bodyClean.substr(0, 30);

        var newNotification = {
          user: user.userId,
          model: model,
          modelId: comment.id,
          action: action,
          actor: actor.id,

          locale: locale,

          targetModelType: 'post',
          targetModelId: commentedModel.id,
          displayName: actor.displayName,
          contentType: commentedModel.contentType,
          relatedContentTeaser: commentedModel.bodyTeaser,
          targetContentTeaser: comment.bodyTeaser
        }

        if ( commentedModel.sharedIn && commentedModel.sharedIn[0] ) {
          newNotification.groupId = commentedModel.sharedIn[0].id;
          newNotification.groupName = commentedModel.sharedIn[0].name;
        }

        Notification.create(newNotification)
        .exec(function(error) {
          if (error) {
            return sails.log.error('Error on getUsersFromSharedWithField Notification.create', error);
          }
        });
      });
    });
  })
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
