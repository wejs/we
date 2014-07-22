
define(['we','ember'], function (we) {

  App.WeAvatarModalComponent = Ember.Component.extend({
    url: "/api/v1/images/",
    attributeBindings: ['user'],
    file: null,
    files: {},
    salvedImage: {},
    imageSelected: false,
    cropImageData: {},
    init: function(){
      this._super();
      we.events.on('showAvatarChangeModal',this.onShowAvatarChangeModal.bind(this));
    },
    filesDidChange: function() {
      this.set('file',this.get('files').item(0));
    }.observes('files'),
    onShowAvatarChangeModal: function(event, data){
      this.set('user', data.user);
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
        $('#avatarChangeModal').modal('hide');
      },
      selectFile: function(){
        var _this = this;
        var uploadUrl = this.get('url');
        var file = this.get('file');

        var uploader = Ember.Uploader.create({
          url: uploadUrl,
          type: 'POST',
          paramName: 'images'
        });

        if (!Ember.isEmpty(file)) {
          var promisseUpload = uploader.upload(file);
          promisseUpload.then(function(data) {
            _this.set('salvedImage',data.images[0]);
            _this.set('imageSelected', true);
          }, function(error) {
            // Handle failure
            console.error('error on upload avatar', error);
          });
        }
      },

      saveAvatar: function(files){
        var _this = this;
        var cords = this.get('cropImageData');
        var image = this.get('salvedImage');
        var userId = App.currentUser.get('id');

        Ember.$.ajax({
          type: 'put',
          url: '/api/v1/user/'+userId+'/avatar',
          data: JSON.stringify({
            imageId: image.id
          }),
          contentType: 'application/json'
        }).done(function(data){

          var avatar = data.avatar;
          App.currentUser.set('avatarId',avatar.id);
          _this.get('store').push('image', avatar);
          _this.get('store').push('user',App.currentUser);
          // close modal
          $('#avatarChangeModal').modal('hide');

          // triger event change modal
          we.events.trigger('userAvatarChange', data);

        }).fail(function(e){
          console.error('Error on image crop',e);
        });

        // Handle success

      }
    }
  });

});