module.exports = function(grunt) {

  var requirejsConfig = require('../../config/requirejs.js').requirejs;

  grunt.config.set('we_sails_ember_tasks', {
    dev: {
      options: {
        replaceStringUrl: 'node_modules/we/assets/',
        requireJsConfig: require('../../config/requirejs.js').requirejs
      },
      src: require('../pipeline').jsFilesToInjectOriginal.map(function(src){
        return 'node_modules/we/assets/' + src;
      })
    },
    prod: {
      options: {
        requireJsConfig: require('../../config/requirejs.js').requirejs,
        concat: true,
        emberFilesPath: 'node_modules/we/assets/js/ember/',
        generateEmberPartsConfigFile: true
      },
      src: require('../pipeline').jsFilesToInjectOriginal.map(function(src){
        return 'node_modules/we/assets/' + src;
      }),
      dest: '.tmp/public/concat/production.js'
    }
  });


  grunt.loadNpmTasks('grunt-we-sails-ember-tasks');

};
