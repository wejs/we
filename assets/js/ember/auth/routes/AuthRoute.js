
define(['we','ember'], function (we) {

  App.Router.map(function(match) {
    // auth
    this.route('authForgotPassword',{path: '/auth/forgot-password'});
    this.route('authResetPasswordToken',{path: '/auth/reset-password/:token_id'});
    this.route('authChangePassword',{path: '/auth/change-password/'});
    this.route('authRegister',{path: '/auth/register'});
  });  

  App.AuthResetPasswordTokenRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('auth/ResetPasswordToken');
    },
    model: function(params) {
      return {
        user: App.currentUser,
        tokenid: params['token_id']
      };
    }
  });

  App.AuthChangePasswordRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('auth/ChangePassword');
    },
    model: function() {
      return {
        user: { 'password':'', 'oldpassword':'', 'repeatpassword':'' }
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