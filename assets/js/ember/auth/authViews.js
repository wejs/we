
App.ModalLoginView = Ember.View.extend({
  templateName: 'auth-login',

  init: function() {
    this._super();
    this.set("controller", App.ModalLoginController.create());
  }
});


App.AuthViewRegister = Ember.View.create({
  templateName: 'auth-register'
});