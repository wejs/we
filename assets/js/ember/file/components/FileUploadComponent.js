
define(['we','ember'], function (we) {

  App.FileUploadComponent = Ember.FileField.extend({
    mimeTypes: null,
    extensions: null,
    files: []
  });

});