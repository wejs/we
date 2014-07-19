
define(['we','ember'], function (we) {
  App.WeVideoComponent = Ember.Component.extend({
    tagName: 'div',
    videoUrl: '',
    videoHtml: '',
    layout: Ember.Handlebars.compile("{{{videoHtml}}}"),
    willInsertElement: function(){
      this._super();
      var _this = this;
      var url = this.get('url');

      var video = we.utils.parseVideoUrl(url);

      if(video){
        this.set('video', video);
        switch (video.provider){
          case 'youtube':
              //this.set('videoHtml',getYoutubeHtml(url));
              this.set('videoUrl','http://www.youtube.com/embed/'+video.id+'?enablejsapi=1');
              this.set('videoHtml', this.getYoutubeHtml( this.get('videoUrl') ));
            break;
          case 'vimeo':
            this.set('videoUrl','//player.vimeo.com/video/'+video.id);
            this.set('videoHtml', this.getVimeoHtml( this.get('videoUrl') ));
            break;
        }
      }
    },
    getYoutubeHtml: function(url){
      return '<iframe class="video-iframe" id="wow-video-<%= video.vid %>" type="text/html" width="560" height="315" src="'+url+'" frameborder="0"></iframe>';
    },
    // TODO add suport to vimeo video
    getVimeoHtml: function(url){
      return '<p>Link: '+url+' </p>';
      //return '<iframe src="" width="WIDTH" height="HEIGHT" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }
  });
});
