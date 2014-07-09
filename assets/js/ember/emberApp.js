/** Copyright 2014, Alberto Souza
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

// starts we.js lib
// TODO move this to amber logic

define('emberApp',[
  'we',
  'showdown',
  'moment',
  'async',
  'ember',
  'weEmberPlugin',
  'sails.io'
], function (we, Showdown, moment, async) {

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


  App.LayoutView = Ember.View.extend({
    //templateName: 'layouts/twoColumns',
    isVisible: true,
    attributeBindings: ['isVisible'],
    init: function() {
      this._super();
      var thisView = this;
      //this.set("controller", App.ModalLoginController.create());
    }
  });

  App.Router.reopen({
    location: 'history'
  });

  // Map app routers
  App.Router.map(function(match) {
    var thisPointer = this;

    this.resource('home',{path: '/'});

    // user route map
    this.resource('userList',{path: '/user'});

    // auth
    this.route('authForgotPassword',{path: '/auth/forgot-password'});
    this.route('authResetPassword',{path: '/auth/reset-password'});

    // item route
    this.resource('user', { path: '/user/:user_id' }, function(){
      // edit item route
      this.route('edit');
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

  var showdown = new Showdown.converter();

  Ember.Handlebars.helper('format-markdown', function(input) {
    return new Handlebars.SafeString(showdown.makeHtml(input));
  });

  Ember.Handlebars.helper('format-date', function(date) {
    return moment(date).fromNow();
  });


  // Localization helper
  if(we.config.language == "en-us"){
    // dont translate if are the default system language
    Ember.Handlebars.registerHelper('t', function (property, options) {
      return property;
    });
  }else{
    Ember.Handlebars.registerHelper('t', function (property, options) {
      if(property){
        return we.i18n( property );
      } else{
        return '';
      }
    });
  }


  // Limit string length
  // usage: {{substr description max=20}}
  // or {{substr description start=5 max=20}}
  Ember.Handlebars.registerHelper('substr', function(property, options) {

    var str = Ember.get(this, property);
    var opts = options.hash;

    var start = opts.start || 0;
    var len = opts.max;

    var out = str.substr(start, len);

    if (str.length > len)
        out += '...';

    return new Handlebars.SafeString(out);
  });

  return App;

});
