
define(['we','ember'], function (we) {

  App.ModalLoginView = Ember.View.extend({
    templateName: 'auth/login',
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
    },
    actions: {
      show: function(){
        console.warn('show');
      }
    }
  });

});