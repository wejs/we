
define(['we','ember'], function (we) {

  App.FileUploadComponent = Ember.FileField.extend({
    files: [],
    /*
    filesDidChange: (function() {

    }).observes('files')
    */
  });

});