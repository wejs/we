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
      console.warn(this.get("password"));
      console.warn(this.get("email"));

      //this.set("email", r);

      //Bootstrap.NM.push('Successfully submitted modal', 'success');
      //return Bootstrap.ModalManager.hide(modalName);
    },

    //Cancel the modal, we don't need to hide the model manually because we set {..., dismiss: 'modal'} on the button meta data
    cancel: function() {
      return Bootstrap.ModalManager.close(modalName);
    },

    //Show the modal
    show: function() {
      return Bootstrap.ModalManager.show(modalName);;
    }

  }
});

})();


