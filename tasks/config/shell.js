/**
 * Grunt shell
 *
 */
module.exports = function(grunt) {
  grunt.config.set('shell', {
    commitBuild: {
      options: {
          failOnError: false
      },
      command: [
        'git add build -A',
        'git commit -m "Update build"'
      ].join('&&')
    }
  });

  grunt.loadNpmTasks('grunt-shell');
};
