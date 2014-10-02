/**
 * NotificationController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var util = require('util');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');

module.exports = {

  getUnreadNotificationCount: function( req, res ) {
    if(!req.isAuthenticated()) return req.forbidden();

    var userId = req.user.id;
    var read = req.param('read');

    if ( !read || read == 'false') {
      read = false;
    } else {
      read = true;
    }

    Notification.count()
    .where({
      user: userId,
      read: Boolean(read)
    }).exec(function(err, count) {
      if (err) {
        sails.log.error('getUnreadNotificationCount:Notification:', err);
        return res.serverError();
      }

      return res.send({
        count: count
      });
    });
  },

  find: function findRecords (req, res) {

    // Look up the model
    var Model = Notification;


    var locale = req.user.locale;
    if (!locale) {
      locale = sails.config.i18n.defaultLocale;
    }


    // Lookup for records that match the specified criteria
    var query = Model.find()
    .where( actionUtil.parseCriteria(req) )
    .limit( actionUtil.parseLimit(req) )
    .skip( actionUtil.parseSkip(req) )
    .sort( actionUtil.parseSort(req) );
    // TODO: .populateEach(req.options);
    //query = actionUtil.populateEach(query, req.options);
    query.exec(function found(err, matchingRecords) {
      if (err) return res.serverError(err);

      if(! matchingRecords ) {
        return res.send({ notifications: {}});
      }

      var recordsRelated = {};

      // fetch each notification to get related records data
      async.each(matchingRecords, function(record, nextRecord){
        Notification.fetchNotificationData(locale, record, recordsRelated, nextRecord);
      },function (err){
        if (err) {
          sails.log.error('Error on get notifications related data', err);
          return res.serverError();
        }

        // convert to array
        for (var prop in recordsRelated) {
          recordsRelated[prop] = _.toArray( recordsRelated[prop] );
        }

        recordsRelated['notification'] = matchingRecords;
        res.send(recordsRelated);
      });

    });
  },


  /**
   * Update one notification
   *
   * Only update read status attr
   *
   */
  update: function updateOneRecord (req, res) {

    // Look up the model
    var Model = Notification;

    // Locate and validate the required `id` parameter.
    var pk = actionUtil.requirePk(req);

    var read = req.param('read');

    // Find and update the targeted record.
    //
    // (Note: this could be achieved in a single query, but a separate `findOne`
    //  is used first to provide a better experience for front-end developers
    //  integrating with the blueprint API.)
    Model.findOne(pk).populateAll().exec(function found(err, matchingRecord) {

      if (err) return res.serverError(err);
      if (!matchingRecord) return res.notFound();

      if ( matchingRecord.read == read) {
        return res.ok({ notification: matchingRecord.read });
      }

      matchingRecord.read = read;
      matchingRecord.notified = true;

      Model.update(pk, matchingRecord)
      .exec(function updated(err, records) {

        // Differentiate between waterline-originated validation errors
        // and serious underlying issues. Respond with badRequest if a
        // validation error is encountered, w/ validation info.
        if (err) return res.negotiate(err);

        // Because this should only update a single record and update
        // returns an array, just use the first item.  If more than one
        // record was returned, something is amiss.
        if (!records || !records.length || records.length > 1) {
          req._sails.log.warn(
          util.format('Unexpected output from `%s.update`.', Model.globalId)
          );
        }

        var recordsRelated = {};

        var updatedRecord = records[0];

        var locale = req.user.locale;
        if (!locale) {
          locale = sails.config.i18n.defaultLocale;
        }

        Notification.fetchNotificationData(locale, updatedRecord, recordsRelated, function() {

          sails.io.sockets.in('user_' + updatedRecord.user).emit(
            'notification',
            {
              id: updatedRecord.id,
              verb: 'updated',
              data: updatedRecord
            }
          );

          recordsRelated['notification'] = updatedRecord;
          res.send(recordsRelated);
        });

      });// </updated>
    }); // </found>
  },

  markAllModelNotificationAsRead: function (req, res) {
    if(!req.isAuthenticated()) return req.forbidden();

    var userId = req.user.id;
    var model = req.param('model');
    var modelId = req.param('modelId');

    if ( !model && !modelId ) {
      return req.badRequest('model and modelId is required');
    }

    Notification.update({
      user: userId,
      read: false,
      targetModelType: model,
      targetModelId: modelId
    },{
      notified: true,
      read: true
    })
    .exec(function updated(err, records) {
      // Differentiate between waterline-originated validation errors
      // and serious underlying issues. Respond with badRequest if a
      // validation error is encountered, w/ validation info.
      if (err) return res.negotiate(err);
      if (!records || !records.length) {
        // no unread notifications
        return res.send(200,{});
      }

      sails.io.sockets.in('user_' + userId).emit(
        'notification',
        {
          id: records.id,
          verb: 'updated',
          data: records
        }
      );

      // if success respond with updated notifications
      res.send({notification: records});
    });// </updated>

  },

  markAllNotificationAsRead: function (req, res) {
    if(!req.isAuthenticated()) return req.forbidden();

    var userId = req.user.id;

    Notification.update({
      user: userId,
      read: false
    },{
      notified: true,
      read: true
    })
    .exec(function updated(err, records) {
      // Differentiate between waterline-originated validation errors
      // and serious underlying issues. Respond with badRequest if a
      // validation error is encountered, w/ validation info.
      if (err) return res.negotiate(err);
      if (!records || !records.length) {
        // no unread notifications
        return res.send(200,{});
      }
      // emit one all notifications read to sync others devices
      sails.io.sockets.in('user_' + userId).emit('notification:allRead');
      // if success respond with 200
      res.send(200,{});
    });// </updated>

  }
};