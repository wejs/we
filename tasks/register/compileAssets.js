module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'handlebars:dev',
		'less:dev',
		'copy:dev'
	]);
};
