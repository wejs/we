
exports.getModelsAttributes = function(){

  var models = {};

  _.forEach(sails.models, function(model, i){

    if(!model.emberJsExcludeFromClient && i != 'permissions'){
      models[i] = model._attributes;
    }

  });

  return models;

};