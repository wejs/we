module.exports = function (grunt) {
  grunt.registerTask('compileAssetsProd', [
    'clean:dev',
    'less:dev',
    'copy:dev',
    'copy:theme_dev',
    'copy:emberJsFiles',
    'weThemeEmberHandlebars:dev',
    'fileindex:list',
    'concat:js'
  ]);
};
