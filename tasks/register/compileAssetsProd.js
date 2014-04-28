module.exports = function (grunt) {
  grunt.registerTask('compileAssetsProd', [
    'clean:dev',
    //'jst:dev',
    'less:dev',
    'copy:prod',
    'template_runner:angularjs'
    //'coffee:dev'
  ]);
};
