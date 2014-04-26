module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		//'jst:dev',
		'less:dev',
		'sync:dev',
    'template_runner:angularjs'
		//'coffee:dev'
	]);
};
