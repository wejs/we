module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'emberhandlebars:dev',
		'less:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
