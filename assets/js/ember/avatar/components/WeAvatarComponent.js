
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
      var self = this;
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
        case 'responsive':
          this.setProperties({
            heigth: 'auto',
            width: '100%',
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
      this.changeAvatarUrl();

      // refresh avatar on user avatar change
      // TODO remove on element destroy
      we.events.on('userAvatarChange',this.onUserAvatarChange.bind(this));
    },
    onUserAvatarChange: function(event, data){
      if(data.user.id === self.userId){
        self.changeAvatarUrl(true);
      }
    },
    willDestroyElement: function(){
      // remove event on element destroy
      we.events.off('userAvatarChange',this.onUserAvatarChange);
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
    }.observes('userId')
  });

});