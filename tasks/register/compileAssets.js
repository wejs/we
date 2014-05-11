module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		//'jst:dev',
		'less:dev',
		'copy:dev'
    //'template_runner:angularjs'
		//'coffee:dev'
	]);
};
