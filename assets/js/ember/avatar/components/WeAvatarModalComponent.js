
define(['we','ember'], function (we) {

  App.WeAvatarModalComponent = Ember.Component.extend({
    url: "/avatar/",
    attributeBindings: ['user'],
    init: function(){
      this._super();
      we.events.on('showAvatarChangeModal',this.onShowAvatarChangeModal.bind(this));
    },
    onShowAvatarChangeModal: function(event, data){
      this.set('user', data.user);
      console.warn('data',data);
      $('#avatarChangeModal').modal('show');
    },
    willDestroyElement: function(){
      we.events.off('showAvatarChangeModal',this.onShowAvatarChangeModal);
    },
    actions: {
      show: function(){
        $('#avatarChangeModal').modal('show');
      },
      close: function(){
        $('#avatarChangeModal').modal('close');
      },
      submit: function(files){
        var uploadUrl = this.get('url');
        var self = this;

        var uploader = Ember.Uploader.create({
          url: uploadUrl,
          type: 'POST'
        });

        if (!Ember.isEmpty(files)) {
          var promisseUpload = uploader.upload(files[0]);
          promisseUpload.then(function(data) {
            // Handle success
            self.user.set('avatarId', data.avatar.id);

            we.events.trigger('userAvatarChange', data);
          }, function(error) {
            // Handle failure
            console.error('error on upload avatar', error);
          });
        }

      }
    }
  });

});