

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
  // if forceBrowserCacheRefresh is true force browser refresh with require.js urlArgs ...
  var refreshString;
  if(sails.config.forceBrowserCacheRefresh){
    // get a randon number for force browser refresh assets
    refreshString = 'ar='+ Math.floor(Math.random() * 1000);
  }else{
    refreshString = sails.config.requirejs.urlArgs;
  }

  if(sails.config.requirejs && sails.config.requirejs.urlArgs){
    return "<script>var require = { urlArgs: '"+refreshString+"'};</script>";
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


  // load live reload script tag
  if(sails.config.clientside.enableLiveReload){
    tags += '<script src="'+sails.config.clientside.liveReloadUrl+'"></script>';
  }


  return tags;
};

// TODO make this config dinamic
exports.getlinkCssTags = function(){
  var tags = '';

  // if forceBrowserCacheRefresh is true force browser refresh
  var refreshString = '';
  if(sails.config.forceBrowserCacheRefresh){
    // get a randon number for force browser refresh assets
    refreshString = '?ar='+ Math.floor(Math.random() * 1000);
  }

  if(sails.config.environment == 'production'){
    tags += '<link rel="stylesheet" href="/min/production.css'+refreshString+'">';
  }else{

    sails.config.assets.css.forEach(function(src) {
      tags += '<link rel="stylesheet" href="/'+src+refreshString+'">';
    });

    if(themeEngine.stylesheet)
      tags += '<link rel="stylesheet" href="/theme/'+themeEngine.stylesheet+refreshString+'">';
  }

  return tags;
}