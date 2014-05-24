module.exports = function(grunt) {

  grunt.config.set('requirejs', {
    compile: {
      options: {
        baseUrl: "assets/",
        mainConfigFile: "assets/js/main.js",
        dir: "testes/"
      },

    }
  });


  grunt.loadNpmTasks('grunt-contrib-requirejs');

};