
define(['we','ember'], function (we) {

  App.AvatarView = Ember.View.extend({
    templateName: 'user/avatar',
    src: '',
    attributeBindings: ['src'],
    init: function() {
      this._super();
      var thisView = this;
      if(we.authenticatedUser.id){
        this.set('isVisible', true);
      }
      we.hooks.on("user-authenticated",function(user, done){
        thisView.set('isVisible', true);
        done();
      });
      we.hooks.on("user-unauthenticated",function(user, done){
        thisView.set('isVisible', false);
        done();
      });
    }
  });

});