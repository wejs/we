
define(['we','ember'], function (we) {

  App.WeImagePreviewComponent = Ember.Component.extend({
    tagName: 'img',
    attributeBindings: ['src'],
    webp: 'auto',
    init: function(){
      this._super();
      var _this = this;
      var file = this.get('file');
      var reader = new FileReader();

      reader.onload = function (e) {
        // get local file src
        _this.set('src', e.target.result);
      };
      reader.readAsDataURL(file);
    },
  });

});