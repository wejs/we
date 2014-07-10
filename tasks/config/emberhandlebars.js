module.exports = function(grunt) {

  grunt.config.set('emberhandlebars', {
    dev: {
      options: {
        templateName: function(sourceFile){
          var name =  sourceFile.replace(/^assets\/templates\//, '').replace(/\.hbs$/, '');
          var names = name.split("/");
          var featureName = null;
          if(names.length == 2){
            if(names[0] == names[1]){
              // like notifications/notifications will be notifications
              return names[1];
            }
          }
          return name;
        }
      },
      files: require('../pipeline').templateFilesToInject,
      dest: '.tmp/public/tpls.hbs.js'
    }
  });

  grunt.loadNpmTasks('grunt-ember-template-compiler');
};
