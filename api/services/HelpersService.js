

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
  return '';
};

/**
 * Get requireJs script tag
 * @return {string} script tag with requirejs configs
 */
exports.getRequireJsScriptTag = function(){
  return HelpersService.getJsScriptTag();
};

/**
 * Get javascript assets tags to print in sails.js template
 *
 * @todo  move this logic to we-theme-engine
 * @return {string} string with <link> tags and project js files based on enviroment
 */
exports.getJsScriptTag = function(){
  var tags = '';
  var refreshString;

  // refresh string
  if(sails.config.clientside.forceBrowserCacheRefresh) {
    refreshString = Math.floor(Math.random() * 1000);
    sails.log.info('config:clientside.forceBrowserCacheRefresh enabled '+
      refreshString + ' will be added in all .js assets files.');
  } else {
    // by default get refresh string from package version
    refreshString = require('../../package.json').version;
  }

  if(sails.config.environment === 'production'){
    // client side production global variable
    tags = '<script>window.PRODUCTION_ENV = true;</script>';
    // production concatened and minified js files
    tags += '<script src="/min/production.js?v='+refreshString+'"></script>';
    // user translations file
    tags += '<script src="/api/v1/translations.js?v='+refreshString+'"></script>';

    return tags;
  }

  var urls = themeEngine.getProjectJsAssetsFiles();

  urls.forEach(function(url){
    tags += '<script src="/'+url+'?v='+refreshString+'"></script>';
  });

  tags += '<script src="/api/v1/translations.js"></script>';

  tags += '<script src="/tpls.hbs.js?v='+refreshString+'"></script>';

  if(themeEngine.javascript)
      tags += '<script src="/theme/'+themeEngine.javascript+'?v='+refreshString+'"></script>';

  // load live reload script tag
  if(sails.config.clientside.enableLiveReload){
    tags += '<script src="'+sails.config.clientside.liveReloadUrl+'"></script>';
  }

  return tags;
};

/**
 * Get css assets tags to print in sails.js template
 *
 * @todo  move this logic to we-theme-engine
 * @return {string} string with <link> tags and project css files based on enviroment
 */
exports.getlinkCssTags = function() {
  var tags = '';

  // if forceBrowserCacheRefresh is true force browser refresh
  var refreshString = '';
  if (sails.config.forceBrowserCacheRefresh) {
    // get a randon number for force browser refresh assets
    refreshString = '?ar='+ Math.floor(Math.random() * 1000);
  } else {
    // by default get refresh string from package version
    refreshString = require('../../package.json').version;
  }

  if(sails.config.environment == 'production'){
    tags += '<link rel="stylesheet" href="/min/production.css?v='+refreshString+'">';
  } else {
    sails.config.assets.css.forEach(function(src) {
      tags += '<link rel="stylesheet" href="/'+src+ '?v=' + refreshString+'">';
    });
  }

  if (themeEngine.stylesheet) {
    tags += '<link rel="stylesheet" href="/theme/'+themeEngine.stylesheet+'?v='+refreshString+'">';
  }

  return tags;
};