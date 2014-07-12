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

  // configure moment.js
  moment.lang(we.config.language);

  // set socket for ember-sails-adapter
  window.socket = we.io.socket;

  // custom date transform for convert sails.js date
  App.DateTransform = DS.Transform.extend({
    deserialize: function (serialized) {
      if (serialized) {
        return moment(serialized).toISOString();
      }
      return serialized;
    },
    serialize: function (deserialized) {
      if (deserialized) {
        return deserialized;
      }
      return deserialized;
    }
  });

  // save current user in App.currentUser
  App.currentUser = Ember.Object.create(we.authenticatedUser);

  App.Router.reopen({
    location: 'history'
  });

  // Map app routers
  App.Router.map(function(match) {
    var thisPointer = this;
    this.resource('home',{path: '/'});
    // auth
    this.route('authForgotPassword',{path: '/auth/forgot-password'});
    this.route('authResetPassword',{path: '/auth/reset-password'});
    // user route map
    this.resource('users',{path: '/user'}, function(){
      // item route
      this.resource('user',{ path: '/:user_id' }, function(){

        // edit item route
        this.route('contacts');
        // edit item route
        this.route('edit');
      });
    });

    // groups route map
    this.resource('groups',{path: '/g'}, function(){
      this.route('create',{path: '/c'});
      // item route
      this.resource('group',{ path: '/:group_id' }, function(){
      });
    });

    // post route map
    this.resource('postList',{path: '/post'});
    // item route
    this.resource('post', { path: '/post/:post_id' }, function(){
      // edit item route
      this.route('edit');
    });

    // 404 pages
    this.route("unknown", { path: "*path"});

    App.advanceReadiness();

  });

  return App;

});
