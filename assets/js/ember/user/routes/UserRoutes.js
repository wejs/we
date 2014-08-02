
define(['we','ember'], function (we) {

  // Map user routers
  App.Router.map(function(match) {
    // user route map
    this.resource('users',{path: '/user'}, function(){
      // item route
      this.resource('user',{ path: '/:user_id' }, function(){
        // edit item route
        this.route('contacts');
        // edit item route
        this.route('images');
        // edit item route
        this.route('edit');
      });
    });
  });

  // route list
  // App.UsersRoute = Ember.Route.extend({
  //   // after change route
  // });
  // route list
  App.UsersIndexRoute = Ember.Route.extend(App.ResetScrollMixin,{
    model: function() {
      return this.store.find('user');
    }
  });

  // route /user/:uid/
  App.UserRoute = Ember.Route.extend({
    model: function(params) {
      var store = this.store;
      // get the user
      var hash = {
        user: this.store.find('user', params['user_id'])
      };

      // get contact relation
      if(App.currentUser.id === params['user_id']){
        hash.contact = { status: 'currentUser' };
      }else if(App.currentUser.id){
        hash.contact = new Ember.RSVP.Promise(function(resolve) {
          Ember.$.ajax({
            type: 'GET',
            url: '/api/v1/user/'+params['user_id']+'/contact',
            dataType: 'json',
            contentType: 'application/json'
          }).done(function(data){
            if(data.contact){
              resolve( store.push('contact',data.contact) );
            }else{
              resolve( Ember.Object.create({status: ''}) );
            }
          }).fail(function(){
            resolve({});
          });
        });
      }else{
        hash.contact = {};
      }
      return Ember.RSVP.hash(hash);
    },
    init: function() {
      this._super();
      var self = this;
      var store = this.get('store');

      // socket.io events added here to work with store
      we.io.socket.on('contact:requested',function(data) {
        if(data.to === App.currentUser.id){
          data.status = 'requestsToYou';
        }
        // save in store
        var contact = store.push('contact',data);
        //if is the current model in this route set the contact
        if(
          self.currentModel.user.id == data.to ||
          self.currentModel.user.id == data.from
        ){
          self.set('currentModel.contact',contact);
        }
      });

      we.io.socket.on('contact:accepted',function(data) {
        // update in store
        var contact = store.push('contact',data);
        // if are in from or to page update the contact data
        if(
          self.currentModel.user.id == data.to ||
          self.currentModel.user.id == data.from
        ){
          self.set('currentModel.contact',contact);
        }
      });

      // TODO!
      we.io.socket.on('contact:ignored',function(data) {
        console.warn('TODO! contact:ignored',data);
        store.push('contact',data);
      });

      we.io.socket.on('contact:deleted',function(data) {
        //if is the current user in model set the contact
        if(self.currentModel.user.id == data.to ||
          self.currentModel.user.id == data.from
        ){
          self.set('currentModel.contact',{});
        }
        // remove record from store
        var contact = store.getById('contact', data.id);
        contact.unloadRecord();
      });
    }
  });

  // route /user/:uid/index
  App.UserIndexRoute = Ember.Route.extend(App.ResetScrollMixin,{
    model: function() {
      var user_id = this.modelFor('user').user.get('id');
      return {
        posts: this.store.find('post',{
          creator: user_id
        })
      };
    },
  });

  // route /user/:uid/images
  App.UserImagesRoute = Ember.Route.extend({
    model: function() {
      var user_id = this.modelFor('user').user.get('id');
      return {
        user: this.modelFor('user'),
        // images load data filter
        loadData: this.load(user_id),
        // images dinamic filter
        images: this.get('store').filter('image', function(image) {
          if(image.get('creator.id') == user_id){
            return true;
          }else{
            return false;
          }
        })
      };
    },
    load: function(user_id){
      return this.store.find('image',{
        creator: user_id
      });
    }
  });

  // route /user/:uid/contact
  App.UserContactRoute = Ember.Route.extend({
    model: function() {
      var user_id = this.modelFor('user').get('id');
      return {
        user: this.modelFor('user')
      };
    },
  });

  // route item /edit
  App.UserEditRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('user/edit');
    }
  });
});