
define(['we','ember'], function (we) {

  App.Router.map(function(match) {
    // post route map
    this.resource('notifications',{path: '/n'}, function(){
      // edit item route
      this.route('lidas');
    });
    // item route
    // this.resource('notification', { path: '/post/:post_id' }, function(){
    //   // edit item route
    //   this.route('edit');
    // });
  });

  App.NotificationsIndexRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('notifications/notifications');
    },
    // model: function(params) {
    //   return this.store.find('notifications', params['post_id']);
    // }
  });

  App.NotificationsLidasRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('notifications/lidas');
    },
    model: function() {
      return this.get('store').filter('notification', function(notification) {
        if( notification.get('notified') == 'notificado'){
          return true;
        }else{
          return false;
        }
      });
    },
    actions: {
      getNews: function(){
        return this.store.find('notification',{
          notified: 'notificado'
        });
      }
    }
    // model: function() {
    //   return this.store.find('notifications');
    // },
  });

  // route item
  App.NotificationsIndexRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('notifications/nao-lidas');
    },
    model: function() {
      return this.get('store').filter('notification', function(notification) {
        if( notification.get('notified') ==  'pendente'){
          return true;
        }else{
          return false;
        }
      });
    }
  });

});