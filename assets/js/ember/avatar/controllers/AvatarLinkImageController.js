

define(['we','ember'], function (we) {

  App.AvatarLinkImageController = Ember.ObjectController.extend({
    avatarUrl: '/imgs/avatars/user-avatar.png',
    init: function(){

      var user = this.get('model');
      if(user.avatarId){
        this.set('avatarUrl', '/image/' + user.avatarId);
      }
      console.warn('User id for avatar',this.get('userId'));
      console.warn('view',this.get('view'));
      console.warn(this);
    }
  });

});
