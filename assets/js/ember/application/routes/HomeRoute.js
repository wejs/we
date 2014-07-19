
define(['we','ember'], function (we) {

  App.HomeRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('home');
    },
    model: function(params) {
      if(we.isAuthenticated()){
        return Ember.RSVP.hash({
          posts: this.store.find('post'),
          postNew: App.postClean()
        });
      }else{
        return {};
      }
    }
  });

});