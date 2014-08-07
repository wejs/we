module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'clean:dev',
    'copy:prod'
	]);
};
