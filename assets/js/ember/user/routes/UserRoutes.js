
define(['we','ember'], function (we) {

  // route list
  App['UserListRoute'] = Ember.Route.extend({
    model: function() {
      return this.store.find('user');
    },
    renderTemplate: function() {
      this.render('user/list');
    }
  });

  // route item
  App['UserRoute'] = Ember.Route.extend({
    model: function(params) {
      return this.store.find('user', params['user_id']);
    },
    renderTemplate: function() {
      this.render('user/item');
    }
  });

  // route item /edit
  App['UserEditRoute'] = Ember.Route.extend({
    renderTemplate: function() {
      this.render('user/edit');
    }
  });
});