module.exports = function (grunt) {
  grunt.registerTask('compileAssetsProd', [
    'clean:dev',
    'less:dev',
    'copy:dev',
    'copy:theme_dev',
    'copy:requireJsFiles',
    'weThemeEmberHandlebars:dev',
    'we_sails_ember_tasks:prod'
  ]);
};
