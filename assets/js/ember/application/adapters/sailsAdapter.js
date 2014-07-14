
/**
 *  Load sailsJs adapter and custom JSONSerializer
 *
 */
define(['we','ember'], function (we) {
  App.ApplicationAdapter = DS.SailsRESTAdapter.extend({
    defaultSerializer: '-default',
    listeningModels: {},
    namespace: 'api/v1',
    init: function () {

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

  // TODO mode to other file and load as requirejs module
  //App.ApplicationSerializer = DS.JSONSerializer.extend({
  App.ApplicationSerializer = DS.RESTSerializer.extend({
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

    // serializeIntoHash: function(hash, type, record, options) {
    //   hash[type.typeKey] = this.serialize(record, options);
    // },

    // extract relationship objects
    // extractFindQuery: function(store, type, payload){
    //   var keys = Object.keys(payload);
    //   for (var prop in obj) {
    //     for (var i = obj.length - 1; i >= 0; i--) {
    //       // get attribute names
    //       for(var attributeName in obj[i]){
    //         // get relationship model
    //         relationshipModel = type.typeForRelationship(attributeName);
    //         if(relationshipModel){
    //           if(!obj[i][attributeName].length){
    //             // dont has one array or the array is empty
    //             // ...
    //           }else if(typeof obj[i][attributeName][0] == 'string'){
    //             // if are a array of strings ids
    //             // ...
    //           }else{
    //           // store this resources if are a array of objects
    //             store.pushMany(relationshipModel.typeKey, obj[i][attributeName]);
    //             // change resource object to id
    //             for (var j = 0; j < obj[i][attributeName].length; j++) {
    //               obj[i][attributeName][j] = obj[i][attributeName][j].id;
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }

    //   return payload;
    // },
    // use extracFindAll to pushMany relations prepopulated
    // extractFindAll: function(store, type, payload){
    //   if(type == 'App.Post'){
    //     for (var i = payload.length - 1; i >= 0; i--) {
    //       if(payload[i].comments.length > 0){

    //         // push comments into store comment model
    //         store.pushMany('comment',payload[i].comments);

    //         // set comment id for every comment in post.comments
    //         var commentLen = payload[i].comments.length;
    //         for (var j = 0; j < commentLen; j++) {
    //           payload[i].comments[j] = payload[i].comments[j].id;
    //         }
    //       }else{
    //         continue;
    //       }
    //     }
    //     return payload;
    //   }else{
    //     return payload;
    //   }
    // },
    // extractDeleteRecord:function(store, type, payload) {
    //   // TODO handle delete association feature
    //   // console.warn(type,payload);

    //   return null;
    // },
    // extractFindHasMany: function(store, type, payload){
    //   console.warn('extractFindHasMany',store, type, payload);
    // }

  });
});