module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'handlebars:dev',
		'less:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
