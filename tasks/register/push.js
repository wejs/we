module.exports = function (grunt) {
  grunt.registerTask('push', [
    'build',
    'shell:commitBuild',
    'bump'
  ]);
};