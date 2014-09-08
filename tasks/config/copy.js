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
		'langs/**'
	];

	var pipelineConfig = require('../pipeline');

	devfiles = devfiles.concat(themeEngine.getProjectAssetsFiles());
	devfiles = devfiles.concat(pipelineConfig.jsFilesToInjectOriginal);

  // @todo move this logic to one npm module
 //  var themeConfigs = require('../../config/theme.js');
 //  var currentTheme = require(themeConfigs.themes.enabled);
 //  var emberTemplatesPath = currentTheme.configs.emberTemplates;
 //  var themeFolders = 'node_modules/';

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
				src: 	[
				  'bower_components/font-awesome/fonts/**',
				  'bower_components/bootstrap/dist/fonts/**/*',
					'bower_components/select2/*.png',
					'bower_components/select2/*.gif',
					'bower_components/lightbox/img/**/*'
				],
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
