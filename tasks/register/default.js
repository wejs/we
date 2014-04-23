module.exports = function (grunt) {
	grunt.registerTask('default', ['compileAssets', 'linkAssets', 'template_runner', 'watch']);
};
