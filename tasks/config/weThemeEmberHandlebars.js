
module.exports = function(grunt) {

  var themeEngine = require('we-theme-engine');

  grunt.config.set('weThemeEmberHandlebars', {
    dev: {
      options: {
        // theme template folder to override templates
        themeTemplatesFolder: themeEngine.getThemeTemplatesToProcess()
      },
      // local files
      files: [
        'node_modules/we/assets/js/ember/*/templates/*.hbs',
        'node_modules/we/assets/js/ember/*/templates/*/*.hbs'
      ],
      dest: '.tmp/public/tpls.hbs.js'
    }
  });

  grunt.loadNpmTasks('grunt-we-ember-template');
};
