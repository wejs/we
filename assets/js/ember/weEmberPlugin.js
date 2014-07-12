/** Copyright 2014, Alberto Souza
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
define('weEmberPlugin',['we','async'], function (we, async) {

  var plugin = {};

  plugin.name = 'weEmberPlugin';
  plugin.type = 'BrowserClientSideSystem';
  plugin.loadType = 'Plugin';

  plugin.enable = function(we) {

    loadUtils(we);
    // start build emberJS after bootstrap we.js
    we.hooks.on("we-bootstrap-end-after-success", function(data, next){

      buildEmber();

      next();
    });

  };

  plugin.disable = function(we) {
    // do something in plugin disable like remove variables and DOM elements ..
  };

  // register the plugin
  we.plugins.register(plugin);

  // -- private functions

  var buildEmber = function buildEmber(){
    console.warn('Start build emberJS: ');

    we.emberApp = {};
    we.emberApp.models = {};

    // load ember and ember-data
    require([
      'handlebars',
      'ember',
      'ember-data',
      'ember-data-sails-adapter',
      'emberTemplates',
      'ember-uploader'
    ],function(){

      // start app after
      window.App = Ember.Application.create({
        locale: we.config.language,
        LOG_TRANSITIONS: true, // basic logging of successful transitions
        LOG_TRANSITIONS_INTERNAL: true, // detailed logging of all routing steps
        LOG_VIEW_LOOKUPS: true
      });

      App.deferReadiness();

      App.Store = DS.Store.extend();

      // TODO move this mixn to one mixins file
      App.LoggedInMixin = Ember.Mixin.create({
        isVisible: function(){
          if(App.currentUser.get('id')){
            return true;
          }else{
            return false;
          }
        }.property('App.currentUser.id')
      });


        // get emberjs adapters
      var emberAdaptersModules = [];
      if(we.configs.client.emberjsParts.parts.adapters){
        emberAdaptersModules = we.configs.client.emberjsParts.parts.adapters;
        delete we.configs.client.emberjsParts.parts.adapters;
      }

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
            // load requirejs custom routes
            require(emberRouteModules,function(){
              // require emberApp file
              require(['emberApp']);
            });
          });
        });
      });

    });
  };

  var loadUtils = function(we){

    we.utils.ember = {};

    /**
     *  Check if a emberjs array of object has te value atrib
     */
    we.utils.ember.arrayObjsHas = function(items, attrib, value){
      for (i = 0; i < items.length; i++) {
        if(items[i].get(attrib) === value){
          return true;
        }
      }
      return false;
    }
  }

  return plugin;
});