module.exports = function(grunt) {

  // @todo move this logic to one npm module
  var themeConfigs = require('../../config/theme.js');
  var currentTheme = require(themeConfigs.themes.enabled);
  var emberTemplatesPath = currentTheme.configs.emberTemplates;
  var themeFolders = 'node_modules/';

  grunt.config.set('weThemeEmberHandlebars', {
    dev: {
      options: {
        // theme template folder to override templates
        themeTemplatesFolder: themeFolders+ emberTemplatesPath
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
