/**
 * Theme system
 */

module.exports = function(sails) {

  setTheme();

  return {

    /**
     * Initialize is fired first thing when the hook is loaded
     *
     * @api public
     */

    initialize: function(cb) {
      cb();
    },

  };

  /**
   * Set enabled theme and theme configs
   */
  function setTheme(){

    var theme_enabled;
    var theme_name = 'wejs-theme-default';
    var templates_path;
    var isUndefined = sails.util.isUndefined;
    var express = sails.hooks.http.app;

    if( !isUndefined(sails.config.themes) && !isUndefined(sails.config.themes.enabled) ){
      // TODO check if this npm exists and are on node_modules folder
      theme_name = sails.config.themes.enabled;
    } else {
      sails.log.info('WE Theme config not found. Starting with default config');
    }

    // TODO check if this npm exists and are on node_modules folder
    theme_enabled = require(theme_name);

    templates_path = sails.config.appPath + '/node_modules/'+ sails.config.themes.enabled + '/' + theme_enabled.configs.views.path;

    // TODO move this config to sails v0.10 new hooks and events
    sails.config.paths.views = templates_path;
    sails.config.paths.layout = templates_path + '/' + theme_enabled.configs.views.path;
    express.set('views', templates_path);

    sails.config.themes.themeEnabled = theme_enabled;

    if(theme_enabled.initialize && typeof  theme_enabled.initialize == "function"){
      theme_enabled.initialize(sails);
    }
  }
};