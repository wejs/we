
define(['we','ember'], function (we) {

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

});