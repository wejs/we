
exports.getModelsAttributes = function(){

  var models = {};

  _.forEach(sails.models, function(model, i){

    if(!model.emberJsExcludeFromClient && i != 'permissions'){
      models[i] = model._attributes;
    }

  });

  return models;

};


/**
 * Get requireJs preload config like urlArgs used for files refresh
 * @return {string} urlArgs from config or a empty string
 */
exports.getRequirejsPreloadConfig = function(){
  if(sails.config.requirejs && sails.config.requirejs.urlArgs){
    return "<script>var require = { urlArgs: '"+sails.config.requirejs.urlArgs+"'};</script>";
  }

  return '';
};

/**
 * Get requireJs script tag
 * @return {string} script tag with requirejs configs
 */
exports.getRequireJsScriptTag = function(){
  return '<script data-main="/main" src="/js/libs/require.js"></script>';
};

