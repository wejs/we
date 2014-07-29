/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on files in the `assets` folder,
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-watch
 *
 */

var themeEngine = require('we-theme-engine');

module.exports = function(grunt) {

	var assetsFiles = [
		'assets/fonts/**/*',
		'assets/imgs/**/*',
		'assets/langs/**/*',
		'assets/styles/**/*',
		'assets/wysiwyg/**/*'
	];
console.log(themeEngine.getThemeFilesToWatch());
	// push fonts folder
	if(themeEngine.fontsFolder)
		assetsFiles.push(themeEngine.fontsFolder);
	if(themeEngine.imagesFolder)
		assetsFiles.push(themeEngine.imagesFolder);

	grunt.config.set('watch', {
		assets: {
			// Assets to watch:
			files: assetsFiles,
			// When assets are changed:
			tasks: [
				'syncAssets'
    	]
		},
		templates: {
			files: [
				'assets/js/**/*.hbs',
			],
			tasks: [
				'weThemeEmberHandlebars:dev'
    	]
		},
		emberScripts: {
			files: [
				'assets/js/**/*.js',
			],
			tasks: [
				'sync:devJs',
				'we_sails_ember_tasks:dev'
    	]
		},
		themeFiles: {
			files: themeEngine.getThemeFilesToWatch(),
			tasks: [
				'sync:themeFiles'
    	]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
