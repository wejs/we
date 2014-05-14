module.exports = function (grunt) {
  grunt.registerTask('compileAssetsProd', [
    'clean:dev',
    'handlebars:dev',
    'less:dev',
    'copy:prod'
  ]);
};
