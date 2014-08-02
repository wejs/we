/**
 * A grunt task to keep directories in sync. It is very similar to grunt-contrib-copy
 * but tries to copy only those files that has actually changed.
 *
 * ---------------------------------------------------------------
 *
 * Synchronize files from the `assets` folder to `.tmp/public`,
 * smashing anything that's already there.
 *
 * For usage docs see:
 * 		https://github.com/tomusdrw/grunt-sync
 *
 */

var themeEngine = require('we-theme-engine');

module.exports = function(grunt) {
	// TODO add suport to sub project sync
	grunt.config.set('sync', {
		dev: {
			files: [{
				cwd: './node_modules/we/assets',
				src: ['**/*.!(coffee)'],
				dest: '.tmp/public'
			}]
		},
		devJs: {
			files: [{
				cwd: './node_modules/we/assets/js',
				src: ['**/*.js'],
				dest: '.tmp/public/js'
			}]
		},
		themeFiles: {
			files: [{
				cwd:  themeEngine.getassetsCwdFolder(),
				src: themeEngine.getThemeFilesToSync(),
				dest: themeEngine.defaultPublicThemeAssetsFolder
			}]
		}
	});

	grunt.loadNpmTasks('grunt-sync');
};
