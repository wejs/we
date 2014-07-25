
define(['we','ember'], function (we) {

  App.PostsController = Ember.ArrayController.extend({
    isAuthenticated: false,
    sortProperties: ['createdAt'],
    sortAscending: false,

    // timeline get old itens vars
    modelType: 'post',
    page: 1,
    perPage: 10,
    loadingMore: false,
    haveMore: true,
    // init
    init: function(){
      this._super();
      _this = this;

      if(we.isAuthenticated()){
        _this.set('isAuthenticated', true);

      }else{
        _this.set('isAuthenticated', false);
      }
    },
    actions: {
      getMore: function() {

        console.warn('get more');
        var _this = this;
        // if dont have more skip this feature
        // in one timeline new contents go to timeline start and are added with push
        if (!this.get('haveMore')) return ;
        // don't load new data if we already are
        if (this.get('loadingMore')) return ;
        this.set('loadingMore', true);
        // add some delay after get more content from server
        Ember.run.later(function() {
          // set nextPage value
          var nextPage = _this.get('page') + 1;
          // get skip value
          // TODO change this to createdAt time
          var skip = nextPage * _this.get('perPage');
          // get more content from store
          _this.store.find( _this.get('modelType') ,{
            limit: _this.get('perPage'),
            skip: skip
          }).then(function(posts){
            if(posts.get('content').length > 0){
              _this.send('gotMore');
            }else{
              _this.send('dontHaveMore');
            }
          });
        }, 500);
      },

      // Also add a method `gotMore` that the route can call back to
      // notify the controller that the new data is in and it can stop
      // showing its loading indicator
      gotMore: function() {
        this.setProperties({
          loadingMore: false,
          page: this.get('page') + 1,
        });
      },
      dontHaveMore: function() {
        this.setProperties({
          loadingMore: false,
          haveMore: false
        });
      }
    }
  });

  App.PostsView = Ember.View.extend({
    didInsertElement: function(){
      // we want to make sure 'this' inside `didScroll` refers
      // to the IndexView, so we use jquery's `proxy` method to bind it
      $(window).on('scroll', $.proxy(this.didScroll, this));
    },

    willDestroyElement: function(){
      console.warn(' willDestroyElement off');
      // have to use the same argument to `off` that we did to `on`
      $(window).off('scroll', $.proxy(this.didScroll, this));
    },

    // this is called every time we scroll
    didScroll: function(){
      console.warn('didScroll');
      if (this.isScrolledToBottom()) {
        this.get('controller').send('getMore');
      }
    },

    // we check if we are at the bottom of the page
    isScrolledToBottom: function(){
      console.warn('isScrolledToBottom');
      var distanceToViewportTop = (
        $(document).height() - $(window).height());
      var viewPortTop = $(document).scrollTop();

      if (viewPortTop === 0) {
        // if we are at the top of the page, don't do
        // the infinite scroll thing
        return false;
      }
console.warn('isScrolledToBottom',viewPortTop, distanceToViewportTop);
      return (viewPortTop - distanceToViewportTop === 0);
    }
  });

});