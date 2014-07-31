
define(['we','ember'], function (we) {

  App.WeImageComponent = Ember.Component.extend({
    tagName: 'img',
    width: '100%',
    //onClick : 'onRemoveImage',
    attributeBindings: ['src','width'],
    webp: 'auto',
    size: 'medium',
    init: function init () {
      this._super();
      // if dont have url get it from file object
      if(!this.get('url')){
        //var file = this.get('file');
        var size = this.get('size');

        var src = this.get('file.urls.'+size);
        this.set('src',src);
      }
    },
    classNames: ['thumbnail'],
    click: function(){
      if(this.get('onClick')){
        this.sendAction('onClick', this.get('file'), this);
      }
    }
  });
});
