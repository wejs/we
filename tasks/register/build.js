module.exports = function (grunt) {
	grunt.registerTask('build', [
    'compileAssetsProd',
    'concat:css',
    'cssmin',
    'uglify',
		'clean:build',
		'copy:build'
	]);
};
