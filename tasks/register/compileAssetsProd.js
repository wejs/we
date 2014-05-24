module.exports = function (grunt) {
  grunt.registerTask('compileAssetsProd', [
    'clean:dev',
    'emberhandlebars:dev',
    'less:dev',
    'copy:prod',
    'we_sails_ember_tasks:prod'
  ]);
};
