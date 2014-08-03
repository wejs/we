/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {
	// we.js theme engine
	var themeEngine = require('we-theme-engine');

	grunt.config.set('concat', {
		js: {
			src: require('../pipeline').jsFilesToInject
			.concat('.tmp/tpls.hbs.js'),
			dest: '.tmp/public/concat/production.js'
		},
		css: {
			src: require('../pipeline').cssFilesToInject
				.concat(themeEngine.getCssFile()),
			dest: '.tmp/public/concat/production.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
