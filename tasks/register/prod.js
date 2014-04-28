module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'concat',
		'uglify',
		//'cssmin',
		'sails-linker:prodJs',
		'sails-linker:devStyles',
		//'sails-linker:devTpl'
	]);
};
