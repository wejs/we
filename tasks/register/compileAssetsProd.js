module.exports = function (grunt) {
  grunt.registerTask('compileAssetsProd', [
    'clean:dev',
    'less:dev',
    'copy:prod',
    'emberhandlebars:dev',
    'we_sails_ember_tasks:prod'
  ]);
};
