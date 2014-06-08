module.exports = function(grunt) {

  var requirejsConfig = require('../../config/requirejs.js').requirejs;

  grunt.config.set('we_sails_ember_tasks', {
    dev: {
      options: {
        requireJsConfig: require('../../config/requirejs.js').requirejs
      },
      src: require('../pipeline').jsFilesToInjectOriginal.map(function(src){
        return 'assets/' + src;
      })
    },
    prod: {
      options: {
        requireJsConfig: require('../../config/requirejs.js').requirejs,
        concat: true,
        emberFilesPath: 'assets/js/ember/',
        generateEmberPartsConfigFile: true
      },
      src: require('../pipeline').jsFilesToInjectOriginal.map(function(src){
        return 'assets/' + src;
      }),
      dest: '.tmp/public/concat/production.js'
    }
  });


  grunt.loadNpmTasks('grunt-we-sails-ember-tasks');

};
