

  App.HomeRoute = Em.Route.extend({
    renderTemplate: function() {
      this.render('auth/registerForm', {
        into: 'application',
        outlet: 'highlighted',
        controller: 'AuthRegister'
      });
    }
  });