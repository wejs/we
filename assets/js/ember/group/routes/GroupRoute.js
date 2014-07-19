
define(['we','ember'], function (we) {


  App.Router.map(function(match) {
    // groups route map
    this.resource('groups',{path: '/g'}, function(){
      this.route('create',{path: '/c'});
      // item route
      this.resource('group',{ path: '/:group_id' }, function(){
      });
    });
  });

  // route list
  App.GroupsRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('group/feature');
    }
  });

  // route list
  App.GroupsIndexRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('group')
    }
  });

  // route list
  App.GroupsCreateRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('group/create');
    }
  });

  // route /groups/:uid/
  App.GroupRoute = Ember.Route.extend({

    renderTemplate: function() {
      this.render('group/item');
    }
  });

  // route /user/:uid/index
  App.GroupIndexRoute = Ember.Route.extend({
    model: function() {
      var group_id = this.modelFor('group').get('id');
      var sharedIn = null;

      return Ember.RSVP.hash({
        // set current group
        group: this.modelFor('group'),
        // load initial post data
        loadData: this.loadPosts(group_id),
        // set one post filter for auto update
        posts: this.get('store').filter('post', function(post) {
          sharedIn = post.get('sharedIn');
          if(we.utils.isArray(sharedIn)){
            if(sharedIn.contains(group_id) ){
              return true;
            }else{
              return false;
            }
          }else{
            return false;
          }
        })
      });
    },
    loadPosts: function(group_id){
      return this.store.find('post',{
        sharedIn: group_id
      });
    },
    renderTemplate: function() {
      this.render('group/index');
    }
  });

});