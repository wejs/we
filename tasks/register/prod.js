module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssetsProd',
		'concat:css',
		//'concat:jsProd',
		'uglify',
		'cssmin',
		'sails-linker:prodStyles',
		'sails-linker:devTpl'
	]);
};
