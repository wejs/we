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


App.AuthControllerRegister = Ember.Controller.extend({
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


})();

