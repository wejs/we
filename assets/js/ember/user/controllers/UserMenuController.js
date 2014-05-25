
define(['we','ember'], function (we) {

  App.UserMenuController = Ember.Controller.extend({
    isVisible: false,
    user: {},
    init: function() {
      var self = this;
      if(we.authenticatedUser.id){
        self.store.find('user',we.authenticatedUser.id).then(function(user){
          self.set('user', user);
          self.set('isVisible', true);
        });
      }
      we.hooks.on("user-authenticated",function(user, done){
        self.store.find('user',we.authenticatedUser.id).then(function(userModel){
          self.set('user', user);
          self.set('isVisible', true);
        });
        done();
      });
      we.hooks.on("user-unauthenticated",function(user, done){
        self.set('user', {});
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
