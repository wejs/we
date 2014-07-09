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
  'sails.io',
  'ember-uploader'
], function (we, Showdown, moment, async) {

  // configure moment.js
  moment.lang(we.config.language);

  // set socket for ember-sails-adapter
  window.socket = we.io.socket;

  window.App = Ember.Application.create({
    locale: we.config.language,
    LOG_TRANSITIONS: true, // basic logging of successful transitions
    LOG_TRANSITIONS_INTERNAL: true, // detailed logging of all routing steps
    LOG_VIEW_LOOKUPS: true
  });

  App.deferReadiness();

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

    // get emberjs adapters
  var emberAdaptersModules = [];
  if(we.configs.client.emberjsParts.parts.adapters){
    emberAdaptersModules = we.configs.client.emberjsParts.parts.adapters;
    delete we.configs.client.emberjsParts.parts.adapters;
  }

  App.Store = DS.Store.extend();

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

  var modelNames = Object.keys(we.emberApp.models);

  var emberRequireModules = [];

  // ember routes load after application route map
  var emberRouteModules = [];
  if(we.configs.client.emberjsParts.parts.routes){
    emberRouteModules = we.configs.client.emberjsParts.parts.routes;
    delete we.configs.client.emberjsParts.parts.routes;
  }

  // get emberjs models
  var emberModelModules = [];
  if(we.configs.client.emberjsParts.parts.models){
    emberModelModules = we.configs.client.emberjsParts.parts.models;
    delete we.configs.client.emberjsParts.parts.models;
  }

  // get emberjs modules
  for(var emberjsPart in we.configs.client.emberjsParts.parts){
      emberRequireModules = emberRequireModules.concat( we.configs.client.emberjsParts.parts[emberjsPart] );
  }

  // sails adapter: js/ember/application/adapters/sailsAdapter

  // require emberjs adapter
  require(['js/ember/application/adapters/sailsAdapter'],function(){
  // load ember js models
  require(emberModelModules,function(){
    // then load other resources
    require(emberRequireModules,function(){
      // Set default router contigs
      async.each( modelNames, function(modelName, next){

        var modelVarName = modelName.charAt(0).toUpperCase() + modelName.slice(1).toLowerCase();
        App[modelVarName] = we.emberApp.models[modelName];
        // route list
        App[modelVarName + 'ListRoute'] = Ember.Route.extend({
          model: function() {
            return this.store.find(modelName);
          },
          renderTemplate: function() {
            this.render(modelName+'/list');
          }
        });

        // route item
        App[modelVarName + 'Route'] = Ember.Route.extend({
          model: function(params) {
            return this.store.find(modelName, params[modelName+'_id']);
          },
          renderTemplate: function() {
            this.render(modelName+'/item');
          }
        });

        // route item /edit
        App[modelVarName + 'EditRoute'] = Ember.Route.extend({
          renderTemplate: function() {
            this.render(modelName+'/edit');
          }
        });

        next();

      }, function(){
        // load requirejs custom routes
        require(emberRouteModules,function(){
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

            // TODO add route config to select how routes will be generated
            modelNames.forEach(function(modelName){
              // list route
              this.resource(modelName+'List',{path: '/'+modelName});
              // item route
              this.resource(modelName, { path: '/'+modelName+'/:'+modelName+'_id' }, function(){
                // edit item route
                this.route('edit');
              });

            }, this);


            // 404 pages
            this.route("unknown", { path: "*path"});

            App.advanceReadiness();

          });
        });
      });
    });
  });
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
