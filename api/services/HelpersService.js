
exports.getModelsAttributes = function(){

  var models = {};

  _.forEach(sails.models, function(model, i){
    models[i] = model._attributes;
  });

  return models;

};