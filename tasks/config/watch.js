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
			files: ['assets/**/*'],

			// When assets are changed:
			tasks: ['syncAssets' , 'linkAssets','emberhandlebars:dev',
    'we_sails_ember_tasks:dev']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};
