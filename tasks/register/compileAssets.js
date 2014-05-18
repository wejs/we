module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'emberhandlebars:dev',
		'less:dev',
		'copy:dev'
	]);
};
