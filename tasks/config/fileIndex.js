/**
 */

var themeEngine = require('we-theme-engine');

module.exports = function(grunt) {
  // TODO add suport to sub project sync
  grunt.config.set('fileindex', {
    list: {
      options: {
        format: 'json_flat',
        pretty: true
      },
      files: [{
        dest: '.tmp/config/jsFileslist.json',
        src: themeEngine.getProjectJsAssetsFilesSrcMap()
      }],

    }
  });

  grunt.loadNpmTasks('grunt-fileindex');
};
