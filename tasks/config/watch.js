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
module.exports = function(grunt) {

	grunt.config.set('watch', {
		assets: {
			// Assets to watch:
			files: [
				'assets/fonts/**/*',
				'assets/imgs/**/*',
				'assets/langs/**/*',
				'assets/styles/**/*',
				'assets/wysiwyg/**/*'
			],
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
				'emberhandlebars:dev'
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
