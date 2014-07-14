
define(['we','ember'], function (we) {

  App.Router.map(function(match) {
    // post route map
    this.resource('postList',{path: '/post'});
    // item route
    this.resource('post', { path: '/post/:post_id' }, function(){
      // edit item route
      this.route('edit');
    });
  });

  App.PostListRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('auth/ForgotPassword');
    },
    model: function() {
      return this.store.find('post');
    },
  });

  // route item
  App.PostRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find('post', params['post_id']);
    },
    renderTemplate: function() {
      this.render('post/item');
    }
  });

});