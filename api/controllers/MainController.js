/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
  // require js main file
  requireJSmain: function (req, res) {
    res.set('Content-Type', 'application/javascript');

    var requireJsConfig = '';

    if(sails.config.requirejs){
      requireJsConfig = JSON.stringify(sails.config.requirejs);
    }

    res.send(200,'require.config('+ requireJsConfig +');');
  },
  /**
   * Client side configs
   * @param  {object} req
   * @param  {object} res
   */
  getConfigsJS: function (req, res) {
    var authenticated = false;
    var configs = {};

    configs.version = '1';
    configs.server = {};
    configs.user = {};
    configs.authenticatedUser = {};

    if(req.user){
      // todo check if need to use .toJson in this user
      configs.authenticatedUser = req.user;
    }

    // -- Plugin configs
    configs.plugins = {};

    if(sails.config.clientside.loadTypes){
      configs.plugins.loadTypes = sails.config.clientside.loadTypes;
    }

    if(sails.config.clientside.pluginsDefaultEnabled){
      configs.plugins.enabled = sails.config.clientside.pluginsDefaultEnabled;
    }

    //weEmberPlugin

    // get model atribs
    configs.models = HelpersService.getModelsAttributes();

    res.send(configs);
  },

  index: function (req, res) {
    res.view("home/index.ejs");
  }
};
