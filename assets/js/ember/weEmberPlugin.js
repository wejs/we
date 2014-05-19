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
      'ember',
      'ember-data',
      'ember-data-sails-adapter',
      'emberTemplates',
      'bs-core',
      'bs-modal',
      'bs-button'
    ],function(ember, emberData){
      buildEmberModels(function(error){
        if(error){
          return console.error('WEjs config models not found');
        }


        require(['emberApp']);

      });
    });

  };

  /**
   * Build ember js models based on sails server side models
   * @param  {Function} callback [description]
   */
  var buildEmberModels = function buildEmberModelsFunc(callback){
    if(!we.configs.models){
      callback('WEjs config models not found');
    }

    var attr = DS.attr;
    var modelNames = Object.keys(we.configs.models);

    async.each( modelNames , function(modelName,  nextModel){
      var model = we.configs.models[modelName];
      var modelToAdd = {};

      async.each( Object.keys(model) , function(attributeName, nextAttr){
        if(attributeName == 'id'){
          nextAttr();
        }else{
          if(model[attributeName].type == 'datetime'){
            modelToAdd[attributeName] = attr('date');
          }else{
            modelToAdd[attributeName] = attr('string');
          }
          nextAttr();
        }
      }, function(){
        console.log(modelName);
        we.emberApp.models[modelName] = DS.Model.extend(modelToAdd);

        nextModel();
      });
    }, callback );

  };

  return plugin;
});