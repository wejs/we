
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
      console.warn('mudo');
      this.set('file',this.get('files').item(0));
    }.observes('files'),
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
        var self = this;
        var cropImageData = this.get('cropImageData');
        console.warn('cropImageData',cropImageData);
        // Handle success

      }
    }
  });

});