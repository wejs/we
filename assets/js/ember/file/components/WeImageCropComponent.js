
define(['we','ember', 'jcrop'], function (we) {

  App.WeImageCropComponent = Ember.Component.extend({
    tagName: 'img',
    width: 'auto',
    src: '',
    attributeBindings: ['src','width'],
    webp: 'auto',
    classNames: ['jcrop'],
    data: {},
    didInsertElement: function(){
      var _this = this;
      var file = this.get('file');
      var element = _this.$();

      // set box width based on parent width
      var parentWidth = element.parent().width();

      element.Jcrop({
        setSelect:   [ 0, 0, 650, 650 ],
        boxWidth: parentWidth,
        //boxHeight: 660,
        bgColor: 'black',
        bgOpacity: '0.4',
        onSelect: function(coords) {
          _this.set('data', coords);
        },
        // trueSize: [
        //   file.width,
        //   file.heigth
        // ],
        aspectRatio: 1
      });

    },
    willDestroyElement: function(){
      // disable crop on element destroy
      this.$().Jcrop("disable");
    },

  });

});