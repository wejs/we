module.exports = function (grunt) {
	grunt.registerTask('build', [
    'compileAssetsProd',
    'concat:css',
    'uglify',
    'cssmin',
		'clean:build',
		'copy:build'
	]);
};
