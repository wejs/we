

// we.js theme engine
var themeEngine = require('we-theme-engine');

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
  var tags = '<script data-main="/main" src="/js/libs/require.js"></script>';

  if(themeEngine.javascript)
      tags += '<script src="/theme/'+themeEngine.javascript+'"></script>';

  return tags;
};

// TODO make this config dinamic
exports.getlinkCssTags = function(){
  var tags = '';

  if(sails.config.environment == 'production'){
    tags += '<link rel="stylesheet" href="/min/production.css">';
  }else{
    tags += '<link rel="stylesheet" href="/bower_components/font-awesome/css/font-awesome.css">';
    tags += '<link rel="stylesheet" href="/wysiwyg/summernote/dist/summernote.css">';
    tags += '<link rel="stylesheet" href="/bower_components/select2/select2.css">';
    tags += '<link rel="stylesheet" href="/bower_components/codemirror/lib/codemirror.css">';

    if(themeEngine.stylesheet)
      tags += '<link rel="stylesheet" href="/theme/'+themeEngine.stylesheet+'">';
  }

  return tags;
}