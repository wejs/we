/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Below, as a demonstration, you'll see the built-in dependencies
  // linked in the proper order order

  // Bring in the socket.io client
  'js/libs/socket.io.js',

  // then beef it up with some convenience logic for talking to Sails.js
  'js/sails.io.js',

  // finally, include a simple boilerplate script that connects a socket
  // to the Sails backend with some example code
  //'js/connection.example.js',

  //
  // *->    you might put other dependencies like jQuery or Angular here   <-*
  //

  'bower_components/jquery/dist/jquery.js',
  'bower_components/handlebars/handlebars.js',

  'bower_components/ember/ember.js',
  'bower_components/ember-data/ember-data.js',

  'bower_components/ember-data-sails-adapter/ember-data-sails-adapter.js',


  'bower_components/ember-addons.bs_for_ember/dist/js/bs-core.max.js',

  'bower_components/ember-auth/dist/ember-auth.js',
  'bower_components/ember-i18n/lib/i18n.js',

  'bower_components/showdown/src/showdown.js',


  'js/ember/emberApp.js',


  'js/ember/!(tests)**/*.js',
  'js/ember/*.js',
  // All of the rest of your app scripts
  //'js/**/*.js',


];


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
  'templates/**/*.hbs'
];








// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
