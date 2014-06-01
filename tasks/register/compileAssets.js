module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'less:dev',
		'copy:dev',
    'emberhandlebars:dev',
    'we_sails_ember_tasks:dev'
	]);
};
