
/**
 * Avatar component
 * Usage  {{avatar userId=[user.id]}}
 */

define(['we','ember'], function (we) {

  App.AvatarImageController = Ember.ObjectController.extend({
    avatarUrl: '/imgs/avatars/user-avatar.png',
    defaultAvatarUrl: '/imgs/avatars/user-avatar.png',
    init: function(){
      this._super();

      this.changeAvatarUrl();
    },
    changeAvatarUrl: function() {
      var avatarId = this.get('model').get('avatarId');
      if(avatarId){
        this.set('avatarUrl', '/images/' + avatarId);
      }else{
        this.set('avatarUrl', this.get('defaultAvatarUrl'));
      }
    }.observes("model.avatarId")
  });

});