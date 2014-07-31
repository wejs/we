
var themeEngine = require('we-theme-engine');

module.exports = function(grunt) {
  grunt.config.set('weThemeEmberHandlebars', {
    dev: {
      options: {
        // theme template folder to override templates
        themeTemplatesFolder: themeEngine.getThemeTemplatesToProcess()
      },
      // local files
      files: [
        'assets/js/ember/*/templates/*.hbs',
        'assets/js/ember/*/templates/*/*.hbs'
      ],
      dest: '.tmp/public/tpls.hbs.js'
    }
  });

  grunt.loadNpmTasks('grunt-we-ember-template');
};
