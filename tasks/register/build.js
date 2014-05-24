module.exports = function (grunt) {
	grunt.registerTask('build', [
		'compileAssets',
		'linkAssetsBuild',
		'clean:build',
		'copy:build',
    'we_sails_ember_tasks:dev'
	]);
};
