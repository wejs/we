/**
 *
 */

(function() {

  define('comment/directives/commentsDirective',['angular'], function ( angular ) {
    var module = angular.module('comment')
      .directive('weComments', [
      '$compile',
      function($compile) {
        var linker = function($scope, $element, $attrs) {

        };
        return {
          restrict:"E",
          link: linker,
          scope: false,
          templateUrl: wejs.getTemplateUrl('comment/views/comments.html')

        };
      }
    ]);


    return module;
  });
}());
