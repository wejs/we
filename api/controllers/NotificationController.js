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

        var updatedRecord = records[0];

        res.ok({ notification: updatedRecord });
      });// </updated>
    }); // </found>
  }
};