
define(['we','ember'], function (we) {
  App.ImageCropController = Ember.ObjectController.extend({
    actions: {
      cancelCrop: function(){
        this.transitionToRoute('image', this.get('image.name'));
      },
      saveCrop: function(){
        var self = this;
        var cords = this.get('cropImageData');
        var image = this.get('image');

        Ember.$.ajax({
          type: 'get',
          url: '/api/v1/images-crop/'+image.get('id'),
          data: cords,
          contentType: 'application/json'
        }).done(function(newImage){
          self.get('store').push('image', newImage.image);
          self.transitionToRoute('image', newImage.image.name);
        }).fail(function(e){
          console.error('Error on image crop',e);
        });
      }
    }
  });

});