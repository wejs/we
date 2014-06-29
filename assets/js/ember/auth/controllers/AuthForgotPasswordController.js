
define(['we','ember'], function (we) {

  App.AuthForgotPasswordController = Ember.ObjectController.extend({
    actions: {
      //Submit the modal
      requestPasswordChange: function() {
        //href="/auth/register"
        console.warn(this.get("email"));

        //this.set("email", r);

        //Bootstrap.NM.push('Successfully submitted modal', 'success');
        //return Bootstrap.ModalManager.hide(modalName);
      }
    }
  });

});
