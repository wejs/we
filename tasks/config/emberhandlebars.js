module.exports = function(grunt) {

  grunt.config.set('emberhandlebars', {
    dev: {
      options: {
        templateName: filterNameForAssetsTemplateJs,
      },
      files: require('../pipeline').templateFilesToInject,
      dest: '.tmp/public/tpls.hbs.js'
    }
  });

  /**
   * Filter template name from route
   * User this filter to routes like: 'assets', 'js', 'ember', 'post', 'templates', 'post', 'list'
   * @param  {string} sourceFile file path
   * @return {string}            template name
   */
  function filterNameForAssetsTemplateJs(sourceFile){
    // remove .hbs and split url
    var names = sourceFile.replace(/\.hbs$/, '').split("/");
    var l = names.length;
    switch(names[l -2]) {
    case 'components':
      // is component
      return 'components/'+ names[l-1];
    case 'layouts':
      // is one layout
      return 'layouts/'+ names[l-1];
    case 'templates':
      // is one root template
      return names[l-1];
    default:
      // else is a normal template
      // [feature]/[templatename]
      return names[l -2] + '/' + names[l-1];
    }
  }

  grunt.loadNpmTasks('grunt-ember-template-compiler');
};
