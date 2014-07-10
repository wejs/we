
define(['we','ember'], function (we) {

  // route list
  App.UsersRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('user/feature');
    }
  });

  // route list
  App.UsersIndexRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('user')
    },
    renderTemplate: function() {
      this.render('user/list');
    }
  });

  // route /user/:uid/
  App.UserRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('user', params['user_id']);
    },
    renderTemplate: function() {
      this.render('user/item');
    }
  });

  // route /user/:uid/index
  App.UserIndexRoute = Ember.Route.extend({
    model: function() {
      var user_id = this.modelFor('user').get('id');

      return {
        posts: this.store.find('post',{
          creator: user_id
        })
      }
    },

  });

  // route item /edit
  App.UserEditRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('user/edit');
    }
  });
});