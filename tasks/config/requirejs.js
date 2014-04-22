/**
 * grunt-bower-requirejs
 *
 */
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-bower-requirejs');

  grunt.config.set('bower', {
    target: {
      rjsConfig: 'assets/angularjs/main.js',
      /*
      options: {
        exclude: ['blueimp-canvas-to-blob']
      }
      */
    }

  });

};
