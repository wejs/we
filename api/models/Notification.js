/**
 * Notification model
 *
 * @module      :: Model
 * @description :: Model to store user notifications before show or send to users
 *
 */
var weHelpers = require('we-helpers');
var S = require('string');

module.exports = {
  schema: true,
  attributes: {
    // user how will be notified
    user: {
      type: 'string',
      required: true
    },

    // id of the user how did the activity
    actor: {
      type: 'string'
    },

    model: {
      type: 'string',
      required: true
    },

    modelId: {
      type: 'string',
      required: true
    },

    action: {
      type: 'string',
      required: true
    },


    // notification related data
    displayName: {
      type: 'string'
    },
    locale: {
      type: 'string'
    },
    contentType: {
      type: 'string'
    },
    targetModelType: {
      type: 'string'
    },
    targetModelId: {
      type: 'string'
    },
    groupName: {
      type: 'string'
    },
    groupId: {
      type: 'string'
    },
    relatedContentTeaser: {
      type: 'string'
    },
    targetContentTeaser: {
      type: 'string'
    },

    // flag used to create the notification
    flagType: {
      type: 'string'
    },

    // flags
    emailSend: {
      type: 'boolean',
      defaultsTo: false
    },

    // TODO implement group feature
    // group: {
    //   model: 'group'
    // },

    // Status: salved | unpublished | deleted ...
    status: {
      type: 'string',
      defaultsTo: 'salved'
    },

    // if already notified
    notified: {
      type: 'boolean',
      defaultsTo: false
    },

    read: {
      type: 'boolean',
      defaultsTo: false
    },

    // Override toJSON instance method
    toJSON: function() {
      var obj = this.toObject();
      return Notification.customToJSON(obj);
    }
  },

  /**
   * Custom notification toJSON used on after create
   *
   */
  customToJSON: function (obj){
    // -- Create a translated text for every locale
    obj.contentTypeText = sails.__({
      phrase: 'post.contentType.' + obj.contentType,
      locale: obj.locale
    });

    // if inside group
    if ( obj.groupName ) {
      obj.group = sails.__({
        phrase: 'post.in.group',
        locale: obj.locale
      }) + ' ' + obj.groupName;
    }

    obj.text = sails.__({
        phrase: 'notification.text.' + obj.model + '.' + obj.action,
        locale: obj.locale
      },
      obj
    );

    obj.textClean = S(obj.text).stripTags().s;

    return obj;
  },

  afterCreate: function(record, next) {
    // emit one event to plug others we.js features
    sails.emit('we:model:notification:afterCreate', record);
    next();
  },

  afterUpdate: function(record, next) {
    // emit one event to plug others we.js features
    sails.emit('we:model:notification:afterUpdate', record);
    next();
  },
  /**
   * Load notifications related data and set it on record
   *
   * @param  {object}   locale         user locale ex.: pt-br
   * @param  {object}   record         notification record
   * @param  {object}   recordsRelated records related to cache related data
   * @param  {Function} callback       callback(err, null);
   */
  fetchNotificationData: function fetchNotificationData(locale, record, recordsRelated, callback) {

    var queryGetters = [];
    var actor = null;
    var relatedModel = null;

    // load user actor
    queryGetters.push(function(cb) {
      weHelpers.db.loadRecordIfNotLoaded(
        recordsRelated,
        'user',
        record.actor,
        function(err, recordRelated){
          if ( err ) return cb(err);
          actor = recordRelated;
          return cb();
        }
      );
    });

    // load the related model
    if ( record.model && record.modelId) {
      if (sails.models[record.model]) {
        // get related model in async paralel array
        queryGetters.push(function (cb) {
          weHelpers.db.loadRecordIfNotLoaded(
            recordsRelated,
            record.model,
            record.modelId,
            function(err, recordRelated){
              if ( err ) return cb(err);
              relatedModel = recordRelated;
              return cb();
            }
          );
        });
      }
    }
    // run query with assync
    async.parallel(queryGetters,
    // optional callback
    function(err){
      if (err) {
        return callback(err);
      }
      if (actor && relatedModel) {
        record.actorDisplayName = actor.displayName;
        //record.text = NotificationService.formatTextNotification(locale, record, actor, relatedModel);
      }
      callback(null);
    });
  }
};
