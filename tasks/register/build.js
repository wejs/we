module.exports = function (grunt) {
	grunt.registerTask('build', [
    'compileAssetsProd',
    'concat:css',
    //'concat:jsProd',
    'uglify',
    'cssmin',
//		'compileAssets',
		'clean:build',
		'copy:build'
	]);
};
