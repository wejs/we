/**
 * NotificationController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

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
  }
};