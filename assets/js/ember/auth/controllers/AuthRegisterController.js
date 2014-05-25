
define(['we','ember'], function (we) {

  App.AuthRegisterController = Ember.Controller.extend({
    user: {},
    messages: {},

    isVisible: true,
    attributeBindings: ['isVisible'],

    defaultlanguages: ['en-us', 'pt-br'],
    emailPlaceholder: we.i18n('Your email'),
    passwordPlaceholder: we.i18n('Password'),
    confirmPasswordPlaceholder: we.i18n('Confirm password'),
    usernamePlaceholder: we.i18n('Pick a username'),

    init: function(){
      this._super();
      var self = this;

      if(we.authenticatedUser.id){
        this.set('isVisible', false);
      }

      we.hooks.on("user-authenticated",function(user, done){
        self.set('isVisible', false);
        done();
      });

      we.hooks.on("user-unauthenticated",function(user, done){
        self.set('isVisible', true);
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
          console.error( "Error on register: ", data );
        });

      }
    }
  });

});