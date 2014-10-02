

// node.js configuration loader
var rc = require('rc');
// sails.js :)
var Sails = require('sails');

var fs = require('fs');

var buildDictionary = require('./node_modules/sails/node_modules/sails-build-dictionary');

var includeAll = require('include-all');

var themeEngine = require('we-theme-engine');

var we = {};

// current process path
var subProjectPath = process.cwd();

// default configs
var configs = {
	// set app path to we.js node module
	appPath: __dirname,
  subAppPath: subProjectPath,
  paths: {
    'public': subProjectPath+'/.tmp/public',
    'temporaryFileUploadPath': subProjectPath+'/.tmp/public/uploads/',
    'views':  themeEngine.getThemeSailsTemplatesFolder(),
    'layout': themeEngine.getThemeLayout(),
    'fallbackEmailTemplateFolder': __dirname + '/node_modules/wejs-theme-default/templates/email'
  },
  defaultUserAvatar: __dirname + '/assets/imgs/avatars/user-avatar.png'
};
// themeEngine.getThemeLayout
// TODO!
we.configure = function(){

};


we.getIncludeAll = function(){
 	return includeAll;
};

// --- SAILS.js PART
/** <- form default sails.js app.js
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful.
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */

/**
 * Lift the sails.js server with we.js configs
 * @return {[type]} [description]
 */
we.start = function(){
  Sails.log.debug('Starting sails.js with We.js configs.');

  buildDictionary.aggregate({
    dirname   :  subProjectPath + '/config',
    filter    : /(.+)\.(js|json)$/,
    identity  : true
  }, function(err, localConfig){
    // merge the configs
    var mergedConfig = Sails.util.merge(
      localConfig,
      configs
    );

    // Start server
    Sails.lift(rc('sails',mergedConfig));
  });
};

we.load = function(){
  Sails.log.debug('Loading sails.js with We.js configs.');

  buildDictionary.aggregate({
    dirname   :  subProjectPath + '/config',
    filter    : /(.+)\.(js|json)$/,
    identity  : true
  }, function(err, localConfig){
    // merge the configs
    var mergedConfig = Sails.util.merge(
      localConfig,
      configs
    );

    // Start server
    Sails.load(rc('sails',mergedConfig));
  });
};

we.stop = function stop(){
	// Start server
	return Sails.lower();
};

// --- GRUNT PART
// TODO move to one npm module
we.grunt = {};

/**
 * Load we.js core tasks
 *
 * TODO move to one npm module
 */
we.grunt.loadTasks = function loadTasks(relPath, grunt) {

  var dir = require('path').resolve(__dirname, relPath);

  if( fs.existsSync(dir) ) {
    // in prod env only load config copy task
    if(relPath === './tasks/config' && grunt.cli.tasks[0] === 'prod'){
      return includeAll({
        dirname: dir,
        filter: 'copy.js'
      }) || {};
    }

    //console.warn(grunt);
    return includeAll({
      dirname: dir,
      filter: /(.+)\.js$/
    }) || {};

  } else {
    return null;
  }
};

/**
 * Sub project task loader
 *
 * TODO move to one npm module
 */
we.grunt.loadSubProjectTasks = function loadSubProjectTasks(relPath, grunt) {

  var dir = require('path').resolve(process.cwd(), relPath);

  if( fs.existsSync(dir) ) {

    // in prod env only load config copy task
    if(relPath === './tasks/config' && grunt.cli.tasks[0] === 'prod'){

      return includeAll({
        dirname: dir,
        filter: 'copy.js'
      }) || {};
    }

    //console.warn(grunt);
    return includeAll({
      dirname: dir,
      filter: /(.+)\.js$/
    }) || {};

  } else {
    return null;
  }

};


// exports IT!
module.exports = we;
