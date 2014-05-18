module.exports = function (grunt) {
  grunt.registerTask('compileAssetsProd', [
    'clean:dev',
    'emberhandlebars:dev',
    'less:dev',
    'copy:prod'
  ]);
};
