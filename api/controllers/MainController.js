/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var fs = require('fs');
// current process path
var subProjectPath = process.cwd()+ '/';


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
    configs.client.publicVars = {};
    configs.user = {};
    configs.authenticatedUser = {};

    // -- Plugin configs
    configs.plugins = {};

    if(sails.config.clientside.loadTypes){
      configs.plugins.loadTypes = sails.config.clientside.loadTypes;
    }

    if(sails.config.clientside.pluginsDefaultEnabled){
      configs.plugins.enabled = sails.config.clientside.pluginsDefaultEnabled;
    }

    // get log config
    configs.client.log = sails.config.clientside.log;

    // get public vars
    if(sails.config.clientside.publicVars) configs.client.publicVars = sails.config.clientside.publicVars;


    var clientsideEmberjsPartsPath = subProjectPath+'.tmp/config/clientsideEmberjsParts.json';
    fs.exists(clientsideEmberjsPartsPath, function(exists) {
      if (!exists) {
        sails.log.error('getConfigsJS:ClientsideEmberjsParts.json file not found:', err);
        return res.serverError('ClientsideEmberjsParts.json file not found:');
      }

      fs.readFile(clientsideEmberjsPartsPath, 'utf8', function (err, data) {
        if (err){
          sails.log.error('Error on get clientsideEmberjsParts.json file:', err);
          return res.serverError('Error on get clientsideEmberjsParts.json file');
        }

        configs.client.emberjsParts = JSON.parse(data);

        if(!req.isAuthenticated()){
          // send not logged in configs
          return res.send(configs);
        }


        // get user configs
        configs.authenticatedUser = req.user;
        // get user logged in contacts
        Contact.getUserContacts(req.user.id, function(err, contacts){
          if (err) return res.negotiate(err);
          configs.authenticatedUser.contacts = contacts;
          res.send(configs);
        });
      });
    });
  },

  index: function (req, res) {
    res.view("home/index.ejs");
  }
};
