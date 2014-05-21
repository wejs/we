(function(){

var modalName = 'AuthLoginModal';

App.ModalLoginController = Ember.Controller.extend({
  email: '',
  password: '',
  emailPlaceholder: 'Email address',
  passwordPlaceholder: 'Password',
  actions: {
    //Submit the modal
    login: function() {
      //href="/auth/register"

      $.post('/auth/login',{
        email: this.get("email"),
        password: this.get("password")
      })
      .done(function(data) {
        if(data.id){
          we.authenticatedUser = data;
          we.hooks.trigger("user-authenticated", {
            'user':  data
          });
          return Bootstrap.ModalManager.hide(modalName);
        }
      })
      .fail(function(data) {
        console.error( "Error on login" );
      });
    },

    //Cancel the modal, we don't need to hide the model manually because we set {..., dismiss: 'modal'} on the button meta data
    cancel: function() {
      return Bootstrap.ModalManager.close(modalName);
    },

    //Show the modal
    show: function() {
      console.warn(this);
      console.warn(this.get('view'));
      console.warn('isVisible',this.get('isVisible'));
      return Bootstrap.ModalManager.show(modalName);
    }

  }
});

})();

(function(){


App.AuthRegisterController = Ember.Controller.extend({
  user: {},
  isVisible: true,

  defaultlanguages: ['en-us', 'pt-br'],
  emailPlaceholder: we.i18n('Your email'),
  passwordPlaceholder: we.i18n('Password'),
  confirmPasswordPlaceholder: we.i18n('Confirm password'),
  usernamePlaceholder: we.i18n('Pick a username'),

  init: function(){

    var controller = this;
    if(we.authenticatedUser.id){
      controller.set('isVisible', false);
    }
    we.hooks.on("user-authenticated",function(user, done){
      controller.set('isVisible', false);
      done();
    });
    we.hooks.on("user-unauthenticated",function(user, done){
      controller.set('isVisible', true);
      done();
    });
  },

  actions: {
    submit: function() {
      var user = this.get('user');

      $.post('/signup',user)
      .done(function(data) {
        console.log('data',data);
        if(data.id){
          we.authenticatedUser = data;
          we.hooks.trigger("user-authenticated", {
            'user':  data
          });
        }
      })
      .fail(function(data) {
        console.error( "Error on login", data );
      });

    }
  }
});

})();

App.ApplicationController = Ember.Controller.extend({
  // the initial value of the `search` property
  search: '',

  actions: {
    query: function() {
      // the current value of the text field
      var query = this.get('search');
      this.transitionToRoute('search', { query: query });
    }
  }
});

App.UserMenuController = Ember.Controller.extend({
  isVisible: false,
  user: {
    username: ''
  },
  init: function() {
    var self = this;
    if(we.authenticatedUser.id){
      self.set('user', we.authenticatedUser);
      self.set('isVisible', true);
    }
    we.hooks.on("user-authenticated",function(user, done){
      self.set('user', we.authenticatedUser);
      self.set('isVisible', true);
      done();
    });
    we.hooks.on("user-unauthenticated",function(user, done){
      self.set('user', {});
      self.set('isVisible', false);
      done();
    });
  }
});
