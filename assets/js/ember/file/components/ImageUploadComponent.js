

define(['we','ember'], function (we) {

  App.ImageUploadComponent = Ember.FileField.extend({
    accept: "image/x-png, image/gif, image/jpeg",
    files: []
  });

});