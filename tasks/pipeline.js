/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */

var _ = require('lodash');

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/**/*.css',
  'bower_components/font-awesome/css/font-awesome.css',
  'wysiwyg/summernote/dist/summernote.css',

  'bower_components/select2/select2.css',

  'bower_components/codemirror/lib/codemirror.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Below, as a demonstration, you'll see the built-in dependencies
  // linked in the proper order order

  // Bring in the socket.io client
  //'js/libs/socket.io.js',

  // then beef it up with some convenience logic for talking to Sails.js
  //'js/sails.io.js',

  // finally, include a simple boilerplate script that connects a socket
  // to the Sails backend with some example code
  //'js/connection.example.js',

  //
  // *->    you might put other dependencies like jQuery or Angular here   <-*
  //

  //'bower_components/jquery/dist/jquery.js',
  'js/libs/jquery.js',
  'js/libs/**.js',

  'js/ember/**/*.js'
  // 'tpls.hbs.js',

  // 'bower_components/async/lib/async.js',

  // 'bower_components/handlebars/handlebars.js',

  // 'bower_components/we/dist/we.onlywe.js',

  // 'bower_components/ember/ember.js',
  // 'bower_components/ember-data/ember-data.js',

  // 'bower_components/ember-data-sails-adapter/ember-data-sails-adapter.js',


  // 'bower_components/ember-addons.bs_for_ember/dist/js/bs-core.max.js',
  //'bower_components/ember-addons.bs_for_ember/dist/js/bs-modal.max.js',
  // changed bs modal
//  'js/libs/bs-modal.js',

//  'bower_components/ember-addons.bs_for_ember/dist/js/bs-button.max.js',

//  'bower_components/bootstrap/dist/js/bootstrap.js',


//  'bower_components/ember-auth/dist/ember-auth.js',
 // 'bower_components/ember-i18n/lib/i18n.js',

 // 'bower_components/showdown/src/showdown.js',

 // 'js/ember/emberApp.js',

 // 'js/ember/!(tests)**/*.js',
  //'js/ember/!(tests)**/**/*.js',

 // 'js/ember/mainRouter.js',
  // All of the rest of your app scripts
 // 'js/*.js',
 // 'js/*/!(tests)**/*.js',


];

// wejs theme config
var themeConfigs = require('../config/theme.js');
var themeCss = [];
if(themeConfigs.themes && themeConfigs.themes.enabled){
  var themeName = themeConfigs.themes.enabled;
  var theme = require(themeName);

  if(theme.configs.stylesheet.files){
    themeCss = theme.configs.stylesheet.files.map(function(path) {
      return 'node_modules/'+themeName+'/'+ path;
    });
  }
}


// requirejs config
var requirejsConfigs = require('../config/requirejs.js').requirejs;


if(requirejsConfigs.paths){
  _.map( requirejsConfigs.paths,function(path) {
    jsFilesToInject.push(path + '.js');
  });
}

//jsFilesToInject +
//console.log('jsFilesToInject',jsFilesToInject);

// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'js/ember/*/templates/*.hbs',
  'js/ember/*/templates/*/*.hbs'
];


// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)

module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
// Original path for use in copy task
module.exports.cssFilesToInjectOriginal = cssFilesToInject;
// Original path for use in copy task
module.exports.jsFilesToInjectOriginal = jsFilesToInject;

module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
// Original path for use in copy task
module.exports.templateFilesToInjectOriginal = templateFilesToInject;

module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});

module.exports.themeCss = themeCss;
