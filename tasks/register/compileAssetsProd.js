module.exports = function (grunt) {
  grunt.registerTask('compileAssetsProd', [
    'clean:dev',
    'less:dev',
    'copy:theme_dev',
    'copy:build_for_prod',
    'emberhandlebars:dev',
    'we_sails_ember_tasks:prod'
  ]);
};
