/**
 * @file Manages modal Avatar change feature, has upload, crop and setNew avatar
 * @author Alberto Souza
 */

define(['we','ember'], function (we) {

  App.WeAvatarModalComponent = Ember.Component.extend({
    url: "/api/v1/images/",
    attributeBindings: ['user'],
    file: null,
    files: {},
    salvedImage: {},
    imageSelected: false,
    cropImageData: {},
    isLoading: false,
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
        var self = this;
        var uploadUrl = this.get('url');
        var file = this.get('file');

        var uploader = Ember.Uploader.create({
          url: uploadUrl,
          type: 'POST',
          paramName: 'images'
        });

        if (!Ember.isEmpty(file)) {

          self.set('isLoading',true);

          var promisseUpload = uploader.upload(file);
          promisseUpload.then(function(data) {
            self.set('salvedImage',data.images[0]);
            self.set('imageSelected', true);

            self.set('isLoading',false);
          }, function(error) {
            // Handle failure
            console.error('error on upload avatar', error);
          });
        }
      },
      cropAndSave: function(){
        var self = this;
        var cords = this.get('cropImageData');
        var imageId = this.get('salvedImage.id');

        Ember.$.ajax({
          type: 'get',
          url: '/api/v1/images-crop/'+ imageId ,
          data: cords,
          contentType: 'application/json'
        }).done(function(newImage){
          self.get('store').push('image', newImage.image);
          self.send('saveAvatar');
        }).fail(function(e){
          console.error('Error on image crop',e);
        });
      },

      saveAvatar: function(){
        var self = this;
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
          self.set('isLoading',false);
          var avatar = data.avatar;
          // set current user avatarId
          App.currentUser.set('avatarId',avatar.id);
          // update user and image on store
          self.get('store').push('image', avatar);
          self.get('store').push('user',App.currentUser);
          // close modal
          $('#avatarChangeModal').modal('hide');
          // triger event change modal
          we.events.trigger('userAvatarChange', data);
        }).fail(function(e){
          /* @TODO handle set avatar errors */
          console.error('Error on image crop',e);
        });
      }
    }
  });

});