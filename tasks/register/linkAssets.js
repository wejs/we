module.exports = function (grunt) {
	grunt.registerTask('linkAssets', [
		'sails-linker:devStyles',
		'sails-linker:devTpl'
	]);
};
