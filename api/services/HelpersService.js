
exports.getModelsAttributes = function(){

  var models = {};

  _.forEach(sails.models, function(model, i){

    if(i != 'permissions'){
      models[i] = model._attributes;
    }

  });

  return models;

};