
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

// TODO make this config dinamic
exports.getlinkCssTags = function(){
  var pipeline = require('../../tasks/pipeline.js');
  var theme_name = sails.config.themes.enabled;
  var theme = require(theme_name);
  var tags = '';

  if(sails.config.environment == 'production'){
    tags += '<link rel="stylesheet" href="/min/production.css">';
  }else{

    tags += '<link rel="stylesheet" href="/styles/bootstrap.min.css">'
    tags += '<link rel="stylesheet" href="/styles/importer.css">';
    tags += '<link rel="stylesheet" href="/styles/theme.css">';
    tags += '<link rel="stylesheet" href="/bower_components/font-awesome/css/font-awesome.css">';
    tags += '<link rel="stylesheet" href="/wysiwyg/summernote/dist/summernote.css">';
    tags += '<link rel="stylesheet" href="/bower_components/select2/select2.css">';
    tags += '<link rel="stylesheet" href="/bower_components/codemirror/lib/codemirror.css">';
    tags += '<link rel="stylesheet" href="/styles/theme/style.css">';


  }

  return tags;
}