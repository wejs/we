
define(['we','ember'], function (we) {

  App.Router.map(function(match) {
    // auth
    this.route('authForgotPassword',{path: '/auth/forgot-password'});
    this.route('authResetPassword',{path: '/auth/reset-password'});
    this.route('authRegister',{path: '/auth/register'});    
  });  

  App.AuthResetPasswordRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('auth/ResetPassword');
    },
    model: function() {
      return {
        password: '',
        repeatPassword: '',
        messages: [],
      };
    }
  });

  App.AuthForgotPasswordRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('auth/ForgotPassword');
    },
    model: function() {
      return {
        email: '',
        messages: [],
      };
    }
  });

  App.AuthRegisterRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('auth/RegisterForm');
    },
    controllerName: 'AuthRegister',
    beforeModel: function() {
      // if logged
      //console.warn('inicio do if');
      if(App.currentUser.get('id')){
        // redirect
        //console.warn('vai redirecionar');
        this.transitionTo('home');
      }
    }
  });

});