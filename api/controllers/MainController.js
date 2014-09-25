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

    if(sails.config.environment === 'production'){
      requireJsConfig = 'require(["/concat/production.js"],function(){' + requireJsConfig + '});';
    }

    res.send(200,requireJsConfig );
  },
  /**
   * Client side configs
   * @param  {object} req
   * @param  {object} res
   */
  getConfigsJS: function (req, res) {
    var configs = {};

    // set header to never cache this response
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    configs.version = '1';
    configs.server = {};
    configs.client = {};
    configs.client.publicVars = {};
    configs.user = {};
    configs.authenticatedUser = {};

    configs.server.providers = sails.config.wejs.providers;

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
    if(sails.config.clientside.publicVars) {
      // clone it to dont change global variable
      configs.client.publicVars = _.clone(sails.config.clientside.publicVars);
    }

    configs.client.language = sails.config.i18n.defaultLocale;

    if(!req.isAuthenticated()){
      // send not logged in configs
      return res.send(configs);
    }

    // set current session user auth token and userId
    if( req.session.authToken ) {
      configs.client.publicVars.authToken = req.session.authToken;
      configs.client.publicVars.userId = req.session.userId;
    }

    // get user logged in contacts
    // TODO DEPRECATED remove this Contact.getUserContacts getter
    Contact.getUserContacts(req.user.id, function(err, contacts){
      if (err) return res.negotiate(err);
      configs.authenticatedUser.contacts = contacts;
      res.send(configs);
    });

  },

  getTranslations: function (req, res) {
    var localeParam = req.param('locale');
    var locale;

    if (localeParam) {
      // check if the locale are in avaible we.js locales
      // TODO add suport to search in subprojects
      for (var i = sails.config.i18n.locales.length - 1; i >= 0; i--) {
        if(sails.config.i18n.locales[i] === localeParam){
          locale = localeParam;
        }
      }
    }

    if(req.isAuthenticated()){
      locale = req.user.language;
    }

    if(!locale){
      locale = sails.config.i18n.defaultLocale;
    }

    var translationResponse = '';

    translationResponse += 'if(typeof Ember === "undefined"){' +
      'Ember = {};' +
      'Ember.I18n = {};' +
    '}\n';

    translationResponse += 'if(!Ember.I18n.translations){' +
      'Ember.I18n.translations = {};' +
    '}\n';


    getTranslationFilePath(locale , function(path){
      if (path) {
        fs.readFile(path, 'utf8', function (err, data) {
          if (err) {
            sails.log.error('Error: ' + err);
            return res.serverError();
          }

          translationResponse += 'Ember.I18n.translations = ';
          translationResponse+= data;
          translationResponse += ';';

          res.contentType('application/javascript');
          res.send(200, translationResponse );
        });
      } else {
        sails.log.debug('getTranslations:Locale not found:', locale, localeParam);
        res.contentType('application/javascript');
        res.send(200, translationResponse );
      }

    });

  },

  index: function (req, res) {
    res.view('home/index.ejs');
  }
};

function getTranslationFilePath (locale, callback){
  var localePath = null;

  if(sails.config.subAppPath){
    // check if exists in sub app
    localePath = sails.config.subAppPath + '/config/locales/' + locale + '.json';
    fs.exists(localePath, function (exists) {
      if(exists){
        return callback(localePath);
      }

      // if dont have in subapp use we.js default translations
      localePath = sails.config.appPath + '/config/locales/' + locale + '.json';
      fs.exists(localePath, function (exists) {
        if(exists){
          return callback(localePath);
        }
        sails.log.info('Localization not found in project or sub-project for', locale);
        callback();
      });
    });
  }
}

