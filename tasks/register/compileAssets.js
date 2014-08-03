module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'less:dev',
		'copy:dev',
    'copy:theme_dev',
    'copy:requireJsFiles',
    'weThemeEmberHandlebars:dev',
    'emberjsPartsConfig:generate'
    //'we_sails_ember_tasks:dev'
	]);
};
