/**
 * Require js optimizer
 *
 */
module.exports = function(grunt) {

  grunt.config.set('requirejs', {
    compile: {
      options: {
        baseUrl: "./",
        appDir: "assets/",
        mainConfigFile: "assets/main.js",
        removeCombined: true,
        findNestedDependencies: true,
        optimize: "none",
        //name: "path/to/almond", // assumes a production build using almond
        dir: ".tmp/"
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
};
