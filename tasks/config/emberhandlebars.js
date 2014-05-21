module.exports = function(grunt) {

  grunt.config.set('emberhandlebars', {
    dev: {
      options: {
        templateName: function(sourceFile){
          return sourceFile.replace(/^assets\/templates\//, '').replace(/\.hbs$/, '');
        }
      },
      files: require('../pipeline').templateFilesToInject,
      dest: '.tmp/public/tpls.hbs.js'
    }
  });


  grunt.loadNpmTasks('grunt-ember-template-compiler');

};
