
define(['we','ember'], function (we) {

  App.WeAvatarComponent = Ember.Component.extend({
    avatarUrl: '/imgs/avatars/user-avatar.png',
    defaultAvatarUrl: '/imgs/avatars/user-avatar.png',
    attributeBindings: ['userId'],
    userId: null,
    didInsertElement: function didInsertElement() {

      this._super();
      var self = this;

      self.changeAvatarUrl();

      // refresh avatar on user avatar change
      we.events.on('userAvatarChange',function(event, data){
        if(data.user.id === self.userId){
          self.changeAvatarUrl(true);
        }
      });

    },
    changeAvatarUrl: function(refresh) {
      var userId = this.get('userId');
      if(userId){
        if(refresh){
          // get current time to set as refresh query param
          var refreshTime = new Date().getTime();
          this.set('avatarUrl', '/avatar/' + userId + '?r=' + refreshTime);
        }else{
          this.set('avatarUrl', '/avatar/' + userId);
        }
      }else{
        this.set('avatarUrl', this.get('defaultAvatarUrl'));
      }
    }
  });

});