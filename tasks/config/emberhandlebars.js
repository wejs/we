module.exports = function(grunt) {

  grunt.config.set('emberhandlebars', {
    dev: {
      options: {
        templateName: function(sourceFile){
          sourceFile = sourceFile.replace(/^assets\/templates\//, '');
          if( !sourceFile.match(/^components\//) ){
            sourceFile = sourceFile.replace('/', '-');
          }

          return sourceFile.replace(/\.hbs$/, '');
        }
      },
      files: require('../pipeline').templateFilesToInject,
      dest: '.tmp/public/tpls.hbs.js'
    }
  });


  grunt.loadNpmTasks('grunt-ember-template-compiler');

};
