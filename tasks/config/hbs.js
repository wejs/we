
module.exports = function(grunt) {

  grunt.config.set('handlebars', {
    dev: {
      options: {
        namespace: 'Ember.TEMPLATES',
        processName: function(filePath) {
          return filePath.replace(/^assets\/templates\//, '').replace(/\.hbs$/, '');
        }
      },
      files: {
        '.tmp/public/tpls.hbs.js': require('../pipeline').templateFilesToInject
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
};
