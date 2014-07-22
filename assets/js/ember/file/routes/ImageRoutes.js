
define(['we','ember'], function (we) {

  App.Router.map(function(match) {
    //  route map
    this.resource('images',{path: '/i'}, function(){
      this.route('create',{path: '/n'});
      // item route
      this.resource('image',{ path: '/:name' }, function(){
        this.route('crop',{path: '/crop'});
      });
    });
  });

  // route //:uid/
  App.ImageRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('image/item');
    },
    model: function(params) {
      return this.store.find('image', params['name']);
    },
  });

  // route //:uid/index
  App.ImageIndexRoute = Ember.Route.extend(App.ResetScrollMixin,{
    model: function() {
      var isCreator = (this.modelFor('image').get('creator.id') == App.currentUser.get('id'));
      return Ember.RSVP.hash({
        creator: this.store.find('user', this.modelFor('image').get('creator.id')),
        image: this.modelFor('image'),
        isCreator: isCreator
      });
    }
  });

  // route //:uid/crop
  App.ImageCropRoute = Ember.Route.extend(App.ResetScrollMixin,{
    beforeModel: function() {
      // redirect to forbiden page
      if(this.modelFor('image').get('creator.id') != App.currentUser.get('id')){
        this.transitionTo('forbiden');
      }
    },
    model: function() {
      return Ember.RSVP.hash({
        image: this.modelFor('image')
      });
    }
  });

});