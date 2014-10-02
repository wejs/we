/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
var themeEngine = require('we-theme-engine');

module.exports = function(grunt) {

	var devfiles = [
		'fonts/**',
		'imgs/**',
		'langs/**',
		'core/**'
	];

	var pipelineConfig = require('../pipeline');

	devfiles = devfiles.concat(themeEngine.getProjectAssetsFiles());
	devfiles = devfiles.concat(pipelineConfig.jsFilesToInjectOriginal);

	grunt.config.set('copy', {
		dev: {
			files: [{
				expand: true,
				cwd: './node_modules/we/assets',
				src: 	devfiles,
				dest: '.tmp/public'
			},
			// {
			// 	expand: true,
			// 	cwd: 'assets',
			// 	src: 	'**/*',
			// 	dest: '.tmp/public'
			// },
			{
				expand: true,
				cwd: '.',
				src: 	themeEngine.getBowerAssetsFolderToCopy(),
				dest: '.tmp/public'
			},{
				expand: true,
				cwd: '.',
				src: 	devfiles,
				dest: '.tmp/public'
			}]
		},
		emberJsFiles: {
			files: [{
				expand: true,
				cwd: '.',
				src: 	'bower_components/*/ember/**/*.js',
				dest: '.tmp/public'
			}]
		},
		'theme_dev': {
			files: [{
				expand: true,
				cwd: themeEngine.getassetsCwdFolder(),
				src: 	themeEngine.getThemeFilesToCopy(),
				dest: themeEngine.defaultPublicThemeAssetsFolder
			}]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp',
				src: [
					'public/bower_components/**/*',
					'public/fonts/**/*',
					'public/imgs/**/*',
					'public/min/**/*',
					'public/js/libs/require.js',
					'public/langs/**/*',
					'public/tpls.hbs.js',
					'config/**',
					'public/theme/**/*'
				],
				dest: 'build/'
			}]
		},
		prod: {
			files: [{
				expand: true,
				cwd: 'build/',
				src: ['**/*'],
				dest: '.tmp'
			}]
		},
	});

  grunt.loadNpmTasks('grunt-contrib-copy');
};
