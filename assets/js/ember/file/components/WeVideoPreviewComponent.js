
define(['we','ember'], function (we) {
  App.WeVideoPreviewComponent = Ember.Component.extend({
    //onRemove : 'onRemoveVideo',
    tagName: 'div',
    videoUrl: '',
    videoHtml: '',
    layout: Ember.Handlebars.compile("{{{videoHtml}}}"),
    willInsertElement: function(){
      this._super();
      var _this = this;
      var url = this.get('url');

      window.testeUrl = url;

      window.teste = this;

      var videoProvider = we.utils.isVideoUrl(url);

      var video = we.utils.parseVideoUrl(url);

      if(video){
        this.set('video', video);
        switch (video.provider){
          case 'youtube':
              //this.set('videoHtml',getYoutubeHtml(url));
              this.set('videoUrl','http://img.youtube.com/vi/'+video.id+'/0.jpg');
              this.set('videoHtml', this.getYoutubeHtml( this.get('videoUrl') ));
            break;
          case 'vimeo':
            this.set('videoUrl','//player.vimeo.com/video/'+video.id);
            //this.set('videoHtml', this.getVimeoHtml( this.get('videoUrl') ));
            break;
        }
      }
    },
    getYoutubeHtml: function(url){
      return '<img src="'+url+'">';
    },
    // TODO add suport to vimeo video
    getVimeoHtml: function(url){
      return '<img src="'+url+'">';
      //return '<iframe src="" width="WIDTH" height="HEIGHT" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    },

    click: function(){
      if(this.get('onRemove')){
        this.sendAction('onRemove', this.get('url'), this);
      }
    }

  });
});

//http://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg