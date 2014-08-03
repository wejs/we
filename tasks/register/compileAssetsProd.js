module.exports = function (grunt) {
  grunt.registerTask('compileAssetsProd', [
    'clean:dev',
    'less:dev',
    'copy:dev',
    'copy:theme_dev',
    'copy:requireJsFiles',
    'concat:js',
    'weThemeEmberHandlebars:dev',
    'fileindex:list'
  ]);
};
