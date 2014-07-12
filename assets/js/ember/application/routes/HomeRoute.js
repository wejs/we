
define(['we','ember'], function (we) {

  App.HomeRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('home');
    },
    model: function(params) {
      if(we.isAuthenticated()){
        return this.store.find('post');
      }else{
        return null;
      }
    }
  });

});