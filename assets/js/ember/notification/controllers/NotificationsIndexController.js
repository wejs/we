
define(['we','ember'], function (we) {

  App.NotificationsIndexController = Ember.ArrayController.extend({
    sortProperties: ['createdAt'],
    sortAscending:  false,

    unreadTotal: function(){
      return this.get('length');
    }.property('length'),

    // notifications: (function() {
    //   return this.get('content');//.filterProperty('notified', 'pendente');
    // }).property('content.@each.notified'),

    actions: {
      markAllAsRead: function(){
        var store = this.get('store');
        var where = {notified: 'pendente'};

        Ember.$.ajax({
          type: 'GET',
          url: '/api/v1/notify/mark-all-as-read',
          dataType: 'json',
          cache: false,
          contentType: 'application/json'
        }).done(function(data){

          // update notifications on store
          var notifications;
          notifications = store.all('notification',where);
          notifications.forEach(function(notification){
            store.update('notification',{id: notification.id, notified: 'notificado'});
            //notification.set('notified', 'notificado');
          });

        }).fail(function(jqXHR, textStatus, errorThrown){
          console.error(jqXHR);
        });
      }
    }
  });

});
