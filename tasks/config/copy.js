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
module.exports = function(grunt) {
	var devfiles = [
		'fonts/**',
		'imgs/**',
		'langs/**'
	];

	var pipelineConfig = require('../pipeline');

	grunt.config.set('copy', {
		dev: {
			files: [{
				expand: true,
				cwd: './assets',
				src: 	devfiles
								.concat(pipelineConfig.jsFilesToInjectOriginal)
								.concat(pipelineConfig.cssFilesToInjectOriginal)
								// TODO change this url to assets/fonts folder
								.concat('bower_components/font-awesome/fonts/**')
								.concat('bower_components/select2/*.png')
								.concat('bower_components/select2/*.gif'),
				dest: '.tmp/public'
			}]
		},
		theme_dev: {
			files: [{
				expand: true,
				cwd: '.',
				flatten: true,
				src: 	pipelineConfig.themeCss,
				dest: '.tmp/public/styles/theme'
			}]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp',
				src: [
					'public/bower_components/**',
					'public/fonts/**',
					'public/imgs/**',
					'public/min/**',
					'public/js/libs/require.js',
					'public/wysiwyg/**',
					'public/langs/**',
					'public/tpls.hbs.js',
					'config/**'
				],
				dest: 'build/assets'
			}]
		},
		build_for_prod: {
			files: [{
				expand: true,
				cwd: './assets',
				src: 	devfiles
						.concat(['js/libs/*.js', 'js/libs/**/*.js'])
						.concat(pipelineConfig.cssFilesToInjectOriginal)
						// TODO change this url to assets/fonts folder
						.concat('bower_components/font-awesome/fonts/**')
						.concat('bower_components/select2/*.png')
						.concat('bower_components/select2/*.gif'),
				dest: '.tmp/public'
			}]
		},
		prod: {
			files: [{
				expand: true,
				cwd: 'build/assets',
				src: ['**/*'],
				dest: '.tmp'
			}]
		},
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
