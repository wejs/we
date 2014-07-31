
define(['we', 'nprogress','ember'], function (we, NProgress) {

  App.ApplicationRoute = Ember.Route.extend({
    actions: {

      willTransition: function (transition) {
        NProgress.start();
      },
      loading: function(){
        NProgress.set(0.5);
      },
      // after change route
      didTransition: function(transition) {
        NProgress.done(true);
        //window.scrollTo(0,0);
      }

    }
});

});