module.exports = function (grunt) {
	grunt.registerTask('linkAssetsBuild', [
		'sails-linker:devStylesRelative',
		'sails-linker:devTpl'
	]);
};
