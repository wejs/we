
define(['we','ember'], function (we) {
  App.WeVideoPreviewComponent = Ember.Component.extend({
    //onRemove : 'onRemoveVideo',
    tagName: 'img',
    src: '',
    width: '100%',
    attributeBindings: ['src', 'width'],

    willInsertElement: function(){
      this._super();
      var _this = this;
      var url = this.get('url');

      var video = we.utils.parseVideoUrl(url);

      if(video){
        this.set('video', video);
        switch (video.provider){
          case 'youtube':
              this.set('src','http://img.youtube.com/vi/'+video.id+'/0.jpg');
            break;
          case 'vimeo':
            this.set('src','//player.vimeo.com/video/'+video.id);
            break;
        }
      }
    },
    click: function(){
      if(this.get('onRemove')){
        this.sendAction('onRemove', this.get('url'), this);
      }
    }
  });
});

//http://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg