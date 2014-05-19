
App.ModalLoginView = Ember.View.extend({
  templateName: 'auth-login',
  isVisible: true,
  attributeBindings: ['isVisible'],
  init: function() {
    this._super();
    var thisView = this;
    this.set("controller", App.ModalLoginController.create());

    if(we.authenticatedUser.id){
      this.set('isVisible', false);
    }

    we.hooks.on("user-authenticated",function(user, done){
      thisView.set('isVisible', false);
      done();
    });

    we.hooks.on("user-unauthenticated",function(user, done){
      thisView.set('isVisible', true);
      done();
    });
  }
});

App.UserMenuView = Ember.View.extend({
  templateName: 'user-usermenu',
  isVisible: false,
  attributeBindings: ['isVisible'],
  init: function() {
    this._super();
    var thisView = this;

    if(we.authenticatedUser.id){
      this.set('isVisible', true);
    }

    we.hooks.on("user-authenticated",function(user, done){
      thisView.set('isVisible', true);
      done();
    });

    we.hooks.on("user-unauthenticated",function(user, done){
      thisView.set('isVisible', false);
      done();
    });
  }
});


App.AuthViewRegister = Ember.View.create({
  templateName: 'auth-register'
});