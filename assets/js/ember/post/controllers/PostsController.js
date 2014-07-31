
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
      self = this;

      if(we.isAuthenticated()){
        self.set('isAuthenticated', true);
      }else{
        self.set('isAuthenticated', false);
      }
    },
    actions: {
      getMore: function() {
        var self = this;
        // if dont have more skip this feature
        // in one timeline new contents go to timeline start and are added with push
        if (!this.get('haveMore')) return ;
        // don't load new data if we already are
        if (this.get('loadingMore')) return ;
        this.set('loadingMore', true);
        // add some delay after get more content from server
        Ember.run.later(function() {
          // set nextPage value
          var nextPage = self.get('page') + 1;
          // get skip value
          // TODO change this to createdAt time
          var skip = nextPage * self.get('perPage');
          // get more content from store
          self.store.find( self.get('modelType') ,{
            limit: self.get('perPage'),
            skip: skip
          }).then(function(posts){
            if(posts.get('content').length > 0){
              self.send('gotMore');
            }else{
              self.send('dontHaveMore');
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

});