
define(['we','ember'], function (we) {

  App.AuthForgotPasswordRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('auth/ForgotPassword');
    },
    model: function() {
      return {
        email: '',
      };
    }
  });

});