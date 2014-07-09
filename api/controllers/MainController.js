/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var fs = require('fs');
module.exports = {
  // require js main file
  requireJSmain: function (req, res) {
    res.set('Content-Type', 'application/javascript');

    var requireJsConfig = '';
    var requireEnvDeps = '';

    requireJsConfig += requireEnvDeps;

    if(sails.config.requirejs){
      requireJsConfig += 'require.config('+ JSON.stringify(sails.config.requirejs) +');';
    }

    if(sails.config.environment == 'production'){
      requireJsConfig = 'require(["/min/production.js"],function(){' + requireJsConfig + '});';
    }

    res.send(200,requireJsConfig );
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
    configs.client = {};
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

    fs.exists('.tmp/config/clientsideEmberjsParts.js', function(exists) {
      if (exists) {
        configs.client.emberjsParts = require('../../.tmp/config/clientsideEmberjsParts.js').clientsideEmberjsParts;
      }
      //model export logic disabled
      //configs.models = HelpersService.getModelsAttributes();

      res.send(configs);
    });
  },

  index: function (req, res) {
    res.view("home/index.ejs");
  }
};
