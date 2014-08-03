module.exports = function(grunt) {
  grunt.config.set('emberjsPartsConfig', {
    generate: {
      options: {},
      dest: '.tmp/config/clientsideEmberjsParts.js',
      src: '.tmp/public/bower_components/*/ember/*/**/*.js'
    }
  });

  grunt.loadNpmTasks('grunt-we-sails-ember-tasks');
};
