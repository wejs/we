
define(['we','ember'], function (we) {

  App.UserMenuController = Ember.Controller.extend({
    isVisible: false,
    init: function() {
      var self = this;
      if(we.authenticatedUser.id){
        self.set('isVisible', true);
      }
      we.hooks.on("user-authenticated",function(user, done){
        self.set('isVisible', true);
        done();
      });
      we.hooks.on("user-unauthenticated",function(user, done){
        self.set('isVisible', false);
        done();
      });
    },
    actions: {
      showAvatarChangeModal: function(){
        console.warn('change modal',this.get('store'));
        we.events.trigger('showAvatarChangeModal', {
          user: this.get('user')
        });
      }
    }
  });
});
