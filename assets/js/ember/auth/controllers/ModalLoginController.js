
define(['we','ember'], function (we) {

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
            location.reload();
            return Bootstrap.ModalManager.hide('AuthLoginModal');
          }
        })
        .fail(function(data) {
          console.error( "Error on login" );
        });
      },

      //Cancel the modal, we don't need to hide the model manually because we set {..., dismiss: 'modal'} on the button meta data
      cancel: function() {
        return Bootstrap.ModalManager.close('AuthLoginModal');
      },

      //Show the modal
      show: function() {
        console.warn(this);
        console.warn(this.get('view'));
        console.warn('isVisible',this.get('isVisible'));
        return Bootstrap.ModalManager.show('AuthLoginModal');
      }

    }
  });

});