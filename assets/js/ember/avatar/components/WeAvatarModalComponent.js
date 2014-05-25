

define(['we','ember'], function (we) {

  App.WeAvatarModalComponent = Ember.Component.extend({
    url: "/avatar/",
    init: function(){
      this._super();

      var self = this;
      we.events.on('showAvatarChangeModal',function( event, data){
        self.set('user', data.user);
        $('#avatarChangeModal').modal('show');
      });
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