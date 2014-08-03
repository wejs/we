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
		// user assets file
		'assets/fonts/**/*',
		'assets/imgs/**/*',
		'assets/langs/**/*',
		'assets/styles/**/*',
		'assets/wysiwyg/**/*',
		// we.js assets files
		'node_modules/we/assets/fonts/**/*',
		'node_modules/we/assets/imgs/**/*',
		'node_modules/we/assets/langs/**/*',
		'node_modules/we/assets/styles/**/*',
		'node_modules/we/assets/wysiwyg/**/*'
	];

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
			tasks: ['syncAssets'],
			options: { livereload: 12345 }
		},
		templates: {
			files: [
				'assets/js/**/*.hbs',
			],
			tasks: [
				'weThemeEmberHandlebars:dev'
    	],
			options: { livereload: 12345 }
		},
		emberScripts: {
			files: [
				'assets/js/**/*.js',
			],
			tasks: [
				'sync:devJs',
				'we_sails_ember_tasks:dev'
    	],
			options: { livereload: 12345 }
		},
		themeFiles: {
			files: themeEngine.getThemeFilesToWatch(),
			tasks: [
				'sync:themeFiles'
    	],
			options: { livereload: 12345 }
		},
		themeEmberTemplates: {
			files: themeEngine.getThemeTemplatesToWatch(),
			tasks: [
				'weThemeEmberHandlebars:dev'
    	],
			options: { livereload: 12345 }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
