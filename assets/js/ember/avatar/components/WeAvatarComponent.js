
define(['we','ember'], function (we) {

  App.WeAvatarComponent = Ember.Component.extend({
    tagName: 'img',
    heigth: 35,
    width: 35,
    avatarUrl: '/imgs/avatars/user-avatar.png',
    defaultAvatarUrl: '/imgs/avatars/user-avatar.png',
    attributeBindings: [
      'heigth', 'width','userId', 'avatarUrl:src'
    ],
    userId: null,
    // init function
    init: function init(){
      this._super();

      // if pass size atribute set heigth and width
      var size = this.get('size');
      if(size){
        switch(size) {
        case 'large':
          this.setProperties({
            heigth: 250,
            width: 250,
          });
          break;
        case 'medium':
          this.setProperties({
            heigth: 100,
            width: 100,
          });
          break;
        default:
          //default is small
          this.setProperties({
            heigth: 35,
            width: 35,
          });
        }
      }
    },
    // after insert element
    didInsertElement: function didInsertElement() {
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