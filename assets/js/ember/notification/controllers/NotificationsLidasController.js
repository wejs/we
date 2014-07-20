
define(['we','ember'], function (we) {
  App.NotificationsLidasController = Ember.ArrayController.extend({
    sortProperties: ['createdAt'],
    sortAscending:  false
  });
});
