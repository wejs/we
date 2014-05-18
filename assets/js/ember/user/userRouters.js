App.UsersRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  }
});

App.UserRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('user', params.user_id);
  }
});
