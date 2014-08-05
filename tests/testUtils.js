/**
 * Helper / utils functions
 */
var Sails = require('sails');

/**
 * Delete all data from database
 * @param  {function} callbackDoneEmptyDatabase
 */

var testUtils = {};
testUtils.emptyDatabase = function emptyDatabase(callbackDoneEmptyDatabase){
  var modelNames = Object.keys(sails.models);
  async.forEach(modelNames, function (modelName, nextItem){
    sails.models[modelName].destroy(function (err) {
      if(err){
        return nextItem(err);
      }

      nextItem();
    });
  }, function(err) {
      if(err){ testUtils.dlog(err); }

      callbackDoneEmptyDatabase();
  });
};

/**
 * Used for remove model associations  from models for test ur controllers
 * DONT USE IT FOR TEST MODELS!
 * @param  {object} sails model
 * @return {object}  mode withouth associations
 */
testUtils.removeModelAssociations = function removeModelAssociations(model){
  for (var attribute in model.attributes) {
    if (model.attributes.hasOwnProperty(attribute)) {
      if (model.attributes[attribute].model) {
        model.attributes[attribute] = 'string';
      } else if(model.attributes[attribute].collection){
        model.attributes[attribute] = 'array';
      }
    }
  }

  return model;
};

/**
 * Depth logger
 */
testUtils.dlog = function dlog() {
  var depth = arguments[2]
  var label = arguments[0];
  var realArgs = arguments[1]
  var ds = ''
  for(var i = 0; i < depth; i++){
    ds += '  ';
  }
  console.log(label+ds, realArgs)
};



/**
 * Load sails.js server with globals and memory database
 * @param  {Function} callback
 */
testUtils.loadSailsServer = function loadSailsServer(callback){
  Sails.load({
    log: {
      level: 'error'
    },
    connections: {
      memory: {
        adapter   : 'sails-memory'
      }
    },
    models: {
      connection: 'memory'
    },
    port: 1330,
    environment: 'test',
    // @TODO needs suport to csrf token
    csrf: false,
    hooks: {
      grunt: false,
      pubsub: false
    }
  }, function(err, sails) {
    if (err) {
      return callback(err);
    }
    // here you can load fixtures, etc.
    callback(err, sails);
  });
}


module.exports = testUtils;