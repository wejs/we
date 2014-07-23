/** Copyright 2014, Alberto Souza
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

// starts we.js lib
// TODO move this to amber logic

define('emberApp',[
  'we',
  'moment',
  'ember',
  'weEmberPlugin',
  'sails.io'
], function (we, moment) {
  var get = Ember.get;
  var set = Ember.set;


  we.hooks.on("emberjs-load-mixins",function(data, next){
    App.postClean = function(){
      return  {
      body: '',
      'isOpen': false,
      'shareboxClass': 'small',
      'shareImages': false,
      'files': [],
      'sharedIn': [],
      'sharedWith': [],
      'images': [],
      'videos': [],
      'links':[]
      };
    };

    // TODO move this mixn to one mixins file
    App.PostMecanismMixin = Ember.Mixin.create({
      actions: {
        onChangeSelect2Data: function(e){
          if(e.removed){
            switch(e.removed.model) {
              case 'user':
                this.get('sharedWith').removeObject(e.removed.id);
                break;
              case 'group':
                this.get('sharedIn').removeObject(e.removed.id);
                break;
            }
          }
          if(e.added){
            switch(e.added.model) {
              case 'user':
                this.get('sharedWith').pushObject(e.added.id);
                break;
              case 'group':
                this.get('sharedIn').pushObject(e.added.id);
                break;
            }
          }
        },
        onPasteInBody: function(e){
          var data = e.originalEvent.clipboardData.getData('text/plain');
          if(we.utils.isValidUrl(data)){
            // video url
            if(we.utils.isVideoUrl(data)){
              // dont add duplicated links
              if(!this.get('videos').contains(data)){
                this.get('videos').pushObject(data);
              }
            }else{
              //other url
              if(!this.get('videos').contains(data)){
                this.get('links').pushObject(data);
              }
            }
          }
        },
        onRemoveVideo: function(videoUrl, element){
          this.get('videos').removeObject(videoUrl);
        }
      }
    });

    /**
     * Add this on one route to scroll to top every time enter in the route
     */
    App.ResetScrollMixin = Ember.Mixin.create({
      activate: function() {
        this._super();
        window.scrollTo(0,0);
      }
    });

    next();
  });

  we.hooks.on("emberjs-configure-app",function(data, next){

    // configure moment.js
    moment.lang(we.config.language);

    // set socket for ember-sails-adapter
    window.socket = we.io.socket;

    App.Router.reopen({
      location: 'history'
    });

    // save current user in App.currentUser
    App.currentUser = Ember.Object.create(we.authenticatedUser,{
      shareWithOptions: [],
      init: function(){
        this.loadShareWithOptions();
      },
      loadShareWithOptions: function(){
        var _this = this;
        var userId = this.get('id');
        if(!userId){
          return;
        }

        $.ajax({
          type: 'GET',
          url: '/user/'+userId+'/contacts-name',
          cache: false,
          dataType: 'json',
          contentType: 'application/json'
        })
        .done(function success(data){
          if(data.length){
            _this.set('shareWithOptions', data);
          }
        })
        .fail(function error(data){
          console.error('Error on get share with list', data);
        });
      }
    });

    next();
  });

  we.hooks.on("emberjs-map-routes",function(data, next){
    // Map app routers
    App.Router.map(function(match) {
      this.resource('home',{path: '/'});
      // 404 pages
      this.route("unknown", { path: "*path"});
    });
    next();
  });
});
