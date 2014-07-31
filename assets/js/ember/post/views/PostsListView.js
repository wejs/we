
define(['we','ember'], function (we) {

  App.PostsListView = Ember.View.extend({
    didInsertElement: function(){
      $(window).on('scroll', $.proxy(this.didScroll,this) );
    },

    willDestroyElement: function(){
      // have to use the same argument to `off` that we did to `on`
      $(window).off('scroll', $.proxy(this.didScroll,this) );
    },

    // this is called every time we scroll
    didScroll: function(){
      if (this.isScrolledToBottom()) {
        this.get('controller').send('getMore');
      }
    },

    // we check if we are at the bottom of the page
    isScrolledToBottom: function(){
      var distanceToViewportTop = (
        $(document).height() - $(window).height());
      var viewPortTop = $(document).scrollTop();

      if (viewPortTop === 0) {
        // if we are at the top of the page, don't do
        // the infinite scroll thing
        return false;
      }

      return (viewPortTop - distanceToViewportTop === 0);
    }
  });

});