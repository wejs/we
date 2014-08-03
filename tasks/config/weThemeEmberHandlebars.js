
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
        'bower_components/we-cs-core/ember/*/templates/**/*.hbs'
      ],
      dest: '.tmp/public/tpls.hbs.js'
    }
  });

  grunt.task.loadTasks('node_modules/we/node_modules/grunt-we-ember-template/tasks');
};
