/** Copyright 2014, Alberto Souza
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

// starts we.js lib
// TODO move this to amber logic

define([
  'we',
  'showdown',
  'moment',
  'async',
  'ember',
  'weEmberPlugin',
  'sails.io',
  'ember-uploader',
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

  //App.ApplicationAdapter = DS.SailsRESTAdapter.extend({
  App.ApplicationAdapter = DS.SailsSocketAdapter.extend({
      defaultSerializer: '-default',

    //namespace: 'api/v1'
    // pathForType: function(type) {
    //   var camelized = Ember.String.camelize(type);
    //   return Ember.String.singularize(camelized);
    // }

    // fix is error objectt check
    isErrorObject: function(data) {
      return !!(data.error && data.model && data.summary && data.status);
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

  App.initializer({
    name: "injectStoreInComponent",
    initialize: function(container, application) {
      application.inject('component', 'store', 'store:main');
    }
  });


  App.Router.reopen({
    location: 'history'
  });

  var modelNames = Object.keys(we.emberApp.models);

  var emberRequireModules = [];

  // ember routes load after application route map
  var emberRouteModules = [];
  for(var emberjsPart in we.configs.client.emberjsParts.parts){
      emberRequireModules = emberRequireModules.concat( we.configs.client.emberjsParts.parts[emberjsPart] );
  }

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
          this.render(modelName+'/'+modelName+'List');
        }
      });

      // route item
      App[modelVarName + 'Route'] = Ember.Route.extend({
        model: function(params) {
          return this.store.find(modelName, params[modelName+'_id']);
        },
        renderTemplate: function() {
          this.render(modelName+'/'+modelName+'Item');
        }
      });


      next();

    }, function(){

      // Map app routers
      App.Router.map(function(match) {
        var thisPointer = this;

        this.resource('home',{path: '/'});
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

        App.advanceReadiness();

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

  Ember.Handlebars.registerHelper('t', function (property, options) {
    if(property){
      return we.i18n( property );
    } else{
      return '';
    }
  });

  return App;

});
