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

  App.HasManyTransform = DS.Transform.extend({
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


  App.ApplicationSerializer = DS.JSONSerializer.extend({
    // extract relationship objects
    extractFindQuery: function(store, type, payload, x){
      for (var i = payload.length - 1; i >= 0; i--) {
        // get model config from wejs
        var modelConfig = we.configs.models[type.typeKey];
        // get attribute names
        for(var attributeName in payload[i]){
          // check if are collection array hasMany
          if(modelConfig[attributeName] && modelConfig[attributeName].collection ){
            // get relationship model
            relationshipModel = type.typeForRelationship(attributeName);
            if(relationshipModel){
              // store this resources
              store.pushMany(relationshipModel.typeKey, payload[i][attributeName]);
              // change resource object to id
              for (var j = 0; j < payload[i][attributeName].length; j++) {
                payload[i][attributeName][j] = payload[i][attributeName][j].id;
              }

            }
          }
        }
      }
      return payload;
    },
    // use extracFindAll to pushMany relations prepopulated
    extractFindAll: function(store, type, payload){
      if(type == 'App.Post'){
        for (var i = payload.length - 1; i >= 0; i--) {
          if(payload[i].comments.length > 0){

            // push comments into store comment model
            store.pushMany('comment',payload[i].comments);

            // set comment id for every comment in post.comments
            var commentLen = payload[i].comments.length;
            for (var j = 0; j < commentLen; j++) {
              payload[i].comments[j] = payload[i].comments[j].id;
            }
          }else{
            continue;
          }
        }
        return payload;
      }else{
        return payload;
      }
    },
    extractFindHasMany: function(store, type, payload){
      console.warn('extractFindHasMany',store, type, payload);
    }
  });

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
    },
    _listenToSocket: function(model) {
      if(model in this.listeningModels) {
        return;
      }
      var self = this;
      var store = this.container.lookup('store:main');
      var socketModel = model;

      function findModelName(model) {
        var mappedName = self.modelNameMap[model];
        return mappedName || model;
      }

      function pushMessage(message) {
        var type = store.modelFor(socketModel);
        var serializer = store.serializerFor(type.typeKey);
        // Messages from 'created' don't seem to be wrapped correctly,
        // however messages from 'updated' are, so need to double check here.
        /*
        if(!(model in message.data)) {
          var obj = {};
          obj[model] = message.data;
          message.data = obj;
        }
        */
        var record = serializer.extractSingle(store, type, message.data);

        var recordStored = store.push(socketModel, record);

        var attributeNames = Object.keys(we.configs.models[socketModel]);

        for (var attributeName in we.configs.models[socketModel] ) {
          if(we.configs.models[socketModel][attributeName].model){
            if(we.configs.models[socketModel][attributeName].via){
              var parentName = we.configs.models[socketModel][attributeName].model;
              var via = we.configs.models[socketModel][attributeName].via;
              record[parentName].get(via).pushObject(recordStored);
            }
          }
        }
      }

      function destroy(message) {
        var type = store.modelFor(socketModel);
        var record = store.getById(type, message.id);

        if ( record && typeof record.get('dirtyType') === 'undefined' ) {
          record.unloadRecord();
        }
      }

      var eventName = Ember.String.camelize(model).toLowerCase();
      socket.on(eventName, function (message) {
        // Left here to help further debugging.
        console.log("Got message on Socket : ", message, eventName);
        if (message.verb === 'created') {
          // Run later to prevent creating duplicate records when calling store.createRecord
          Ember.run.later(null, pushMessage, message, 50);
        }
        if (message.verb === 'updated') {
          pushMessage(message);
        }
        if (message.verb === 'destroyed') {
          destroy(message);
        }
      });

      // We add an emtpy property instead of using an array
      // ao we can utilize the 'in' keyword in first test in this function.
      this.listeningModels[model] = 0;
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

  var modelNames = Object.keys(we.emberApp.models);

  var emberRequireModules = [];

  // ember routes load after application route map
  var emberRouteModules = [];
  if(we.configs.client.emberjsParts.parts.routes){
    emberRouteModules = we.configs.client.emberjsParts.parts.routes;
    delete we.configs.client.emberjsParts.parts.routes;
  }

  // get emberjs modules
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
