
define(['we','ember'], function (we) {

  App.FileUploadComponent = Ember.FileField.extend({
    files: [],
    mimeTypes: null,
    extensions: null

  });

});