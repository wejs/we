var _ = require('lodash');

var cssFilesToInject = [];

var jsFilesToInject = [
  'js/libs/**/*.js'
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

var templateFilesToInject = [
  'js/ember/*/templates/*.hbs',
  'js/ember/*/templates/*/*.hbs'
];


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
