(function() {

  define('site/filters/i18nFilter',[
    'angular',
    'we'
    ], function ( angular ) {

    angular.module('application.filters')
    .filter('i18n', function () {
      return function (text) {

        if(!text) return '';

        if( (typeof we !== "undefined") && we.i18n){
          return we.i18n(text);
        }else{
          return text;
        }

      };
    });
  });
}());