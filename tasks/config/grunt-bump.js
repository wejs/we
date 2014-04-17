/**
 * Grunt bump
 *
 */
module.exports = function(grunt) {

  grunt.config.set('bump', {
    options: {
      files: ['package.json', 'bower.json'],
      updateConfigs: [],
      commit: true,
      commitMessage: '%VERSION%',
      commitFiles: ['package.json', 'bower.json'], // '-a' for all files
      createTag: true,
      tagName: '%VERSION%',
      tagMessage: '%VERSION%',
      push: true,
      pushTo: 'origin',
      gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
    }

  });

  grunt.loadNpmTasks('grunt-bump');
};
