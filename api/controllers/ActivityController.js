/**
 * ActivityController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = {

  index: function (req, res) {
    if ( !req.isAuthenticated() ) return res.forbidden();

    // get user logged in user contacts
    return Contact.getUserContacts(req.user.id, function (err, contacts) {
      if (err) return sails.log.error('Error on Contact.getUserContacts:',err);

      if (!contacts) return;
      // join follow contact room
      var contactIds = [];
      for (var i = contacts.length - 1; i >= 0; i--) {
        if (contacts[i].to === req.user.id) {
          contactIds.push(contacts[i].from);
        } else if (contacts[i].from === req.user.id) {
          contactIds.push(contacts[i].to);
        }
      }

      Activity.find({
        actor: contactIds
      })
      .limit( 10 )
      .skip( actionUtil.parseSkip(req) )
      .sort('updatedAt DESC')
      .exec(function(err, activities) {

        if (err) {
          sails.log.error(err);
          return res.serverError();
        }

        if (!activities || !activities.length) {
          return res.send();
        }

        res.send(activities);
      });

    });


  }
};
