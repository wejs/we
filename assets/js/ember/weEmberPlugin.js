/** Copyright 2014, Alberto Souza
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * @todo  make this code simpler e easy do read
 *
 */

/*
Hooks Avaible in this plugin ordered by call order:
emberjs-load-ember-libs
emberjs-create-app
emberjs-configure-app
emberjs-load-mixins
emberjs-load-adapters
emberjs-load-models
emberjs-load-resources
emberjs-load-routes
emberjs-init-app
*/

define('weEmberPlugin',['we','async'], function (we, async) {

  var plugin = {};

  plugin.name = 'weEmberPlugin';
  plugin.type = 'BrowserClientSideSystem';
  plugin.loadType = 'Plugin';

  plugin.enable = function(we) {

    //loadUtils(we);
    // start build emberJS after bootstrap we.js
    we.hooks.on("we-bootstrap-end-after-success", function(data, next){
      // load ember.js utils
      loadUtils(we);
      // start we emberjs loader chain
      we.hooks.trigger("emberjs-load-ember-libs");

      next();
    });

    //
    // -- register this plugin hook chain
    //
    we.hooks.on("emberjs-load-ember-libs-after-success",function(data, next){
      require(['emberApp'],function(){
        we.hooks.trigger("emberjs-create-app");
        next();
      });
    });

    we.hooks.on("emberjs-create-app-after-success",function(data, next){
      we.hooks.trigger("emberjs-configure-app");
      next();
    });

    we.hooks.on("emberjs-configure-app-after-success",function(data, next){
      we.hooks.trigger("emberjs-load-mixins");
      next();
    });

    we.hooks.on("emberjs-load-mixins-after-success",function(data, next){
      we.hooks.trigger("emberjs-load-adapters");
      next();
    });

    we.hooks.on("emberjs-load-adapters-after-success",function(data, next){
      we.hooks.trigger("emberjs-load-models");
      next();
    });

    we.hooks.on("emberjs-load-models-after-success",function(data, next){
      we.hooks.trigger("emberjs-load-resources");
      next();
    });

    we.hooks.on("emberjs-load-resources-after-success",function(data, next){
      we.hooks.trigger("emberjs-load-routes");
      next();
    });

    we.hooks.on("emberjs-load-routes-after-success",function(data, next){
      we.hooks.trigger("emberjs-map-routes");
      next();
    });

    we.hooks.on("emberjs-map-routes-after-success",function(data, next){
      we.hooks.trigger("emberjs-init-app");
      next();
    });

    // All loaded the init the app
    we.hooks.on("emberjs-init-app-after-success",function(data, next){
      // advanceReadiness
      App.advanceReadiness();
      next();
    });

  };

  plugin.disable = function(we) {
    // do something in plugin disable like remove variables and DOM elements ..
  };

  // register the plugin
  we.plugins.register(plugin);

  var loadUtils = function(we){

    we.utils.ember = {};

    /**
     *  Check if a emberjs array of object has te value atrib
     */
    we.utils.ember.arrayObjsHas = function(items, attrib, value){
      if(!items){
        return false;
      }
      for (i = 0; i < items.length; i++) {
        if(items[i].get(attrib) === value){
          return true;
        }
      }
      return false;
    };

    /**
     * Remove one item in array of objects by object id
     * @param  {array} items       array
     * @param  {string} idValue    id to search for
     * @return {object|bool}       return the removed object or false if the object not is found
     */
    we.utils.ember.arrayRemoveById = function(items, idValue){
      for (i = 0; i < items.length; i++) {
        if(items[i].id === idValue){
          //remove the item from array and
          //return the value and stop the execution
          return items.splice([i],1);
        }
      }
      // item not found in array
      return false;
    }    ;
  };

  we.hooks.on("emberjs-load-ember-libs", function(data, next){
    // load default emberjs libs
    require([
      'handlebars',
      'ember',
      'ember-data',
      'ember-data-sails-adapter',
      'emberTemplates',
      'ember-uploader'
    ],function(){
      next();
    });
  });

  we.hooks.on("emberjs-create-app",function(data, next){
    // start app after
    window.App = Ember.Application.create({
      locale: we.config.language,
      LOG_TRANSITIONS: true, // basic logging of successful transitions
      LOG_TRANSITIONS_INTERNAL: true, // detailed logging of all routing steps
      LOG_VIEW_LOOKUPS: true
    });

    App.deferReadiness();

    // add getMetaData function on model
    DS.Model.reopen({
      getMetaData: function(){
        return this.get('_data.meta');
      }
    });

    next();
  });

  we.hooks.on("emberjs-load-mixins",function(data, next){
    // require emberjs adapters
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

    next();
  });

  we.hooks.on("emberjs-load-adapters",function(data, next){
    // require emberjs adapters
    require(we.configs.client.emberjsParts.parts.adapters,function(){
      delete we.configs.client.emberjsParts.parts.adapters;
      next();
    });
  });

  we.hooks.on("emberjs-load-models",function(data, next){
    // require emberjs models
    require(we.configs.client.emberjsParts.parts.models,function(){
      delete we.configs.client.emberjsParts.parts.models;
      next();
    });
  });

  we.hooks.on("emberjs-load-routes",function(data, next){
    // require emberjs resources
    require(we.configs.client.emberjsParts.parts.routes,function(){
      delete we.configs.client.emberjsParts.parts.routes;
      next();
    });
  });

  we.hooks.on("emberjs-load-resources",function(data, next){

    var emberRequireModules = [];
    // get emberjs modules
    for(var emberjsPart in we.configs.client.emberjsParts.parts){
      emberRequireModules = emberRequireModules.concat( we.configs.client.emberjsParts.parts[emberjsPart] );
    }

    // require emberjs resources
    require(emberRequireModules,function(){
      next();
    });
  });

  return plugin;
});