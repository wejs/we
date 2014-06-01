module.exports = function (grunt) {
	grunt.registerTask('default', [
    'compileAssets',
    'linkAssets',
    'emberhandlebars:dev',
    'watch'
  ]);
};
