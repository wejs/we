module.exports = function (grunt) {
	grunt.registerTask('linkAssetsBuildProd', [
		'sails-linker:prodStylesRelative',
		'sails-linker:devTpl'
	]);
};
