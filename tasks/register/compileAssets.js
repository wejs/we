module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'emberhandlebars:dev',
		'less:dev',
		'copy:dev',
    'we_sails_ember_tasks:dev'
	]);
};
