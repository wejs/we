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


  // TODO mode to other file and load as requirejs module
  App.ApplicationSerializer = DS.JSONSerializer.extend({
    /*
      @method serializeIntoHash
      @param {Object} hash
      @param {subclass of DS.Model} type
      @param {DS.Model} record
      @param {Object} options
    */
    serializeIntoHash: function(hash, type, record, options) {
      Ember.merge(hash, this.serialize(record, options));
    },

    // extract relationship objects
    extractFindQuery: function(store, type, payload){
      for (var i = payload.length - 1; i >= 0; i--) {
        // get attribute names
        for(var attributeName in payload[i]){
          // get relationship model
          relationshipModel = type.typeForRelationship(attributeName);
          if(relationshipModel){
            if(!payload[i][attributeName].length){
              // dont has one array or the array is empty
              // ...
            }else if(typeof payload[i][attributeName][0] == 'string'){
              // if are a array of strings ids
              // ...
            }else{
            // store this resources if are a array of objects
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
    extractDeleteRecord:function(store, type, payload) {
      // TODO handle delete association feature
      // console.warn(type,payload);

      return null;
    },
    extractFindHasMany: function(store, type, payload){
      console.warn('extractFindHasMany',store, type, payload);
    }

  });

  App.ApplicationAdapter = DS.SailsRESTAdapter.extend({
    defaultSerializer: '-default',
    listeningModels: {},
    init: function () {
      console.warn('inint sails coskcet adapter');
      this._super();
      var _this = this;
      if(this.useCSRF) {
        socket.get('/csrfToken', function response(tokenObject) {
          this.CSRFToken = tokenObject._csrf;
        }.bind(this));
      }

      var models = ['post','activity','comment','user'];

      models.forEach(function(model){
        _this._listenToSocket(model);
      });

    },
    //namespace: 'api/v1'
    pathForType: function(type) {
       var camelized = Ember.String.camelize(type);
       return Ember.String.singularize(camelized);
    },

    /**
     * Listen to default sails.js pubsub methods
     * @return {[type]} [description]
     */
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
        if(!(model in message.data)) {
          var obj = {};
          obj[model] = message.data;
          message.data = obj;
        }
        var record = serializer.extractSingle(store, type, message.data);
        store.push(socketModel, record);
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
        //console.log("Got message on Socket : " + JSON.stringify(message));
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

            App.advanceReadiness();

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
