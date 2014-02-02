/**
 * Directive to show a post
 * @return {[type]} [description]
 */


(function() {

  define(['angular', 'post/post'], function (angular) {

    return angular.module('application.directives')
      .directive('wePostTeaser', [
      '$compile','$http', '$templateCache', '$rootScope' ,
      function($compile, $http, $templateCache, $rootScope) {

        // TODO move this template url to angular submodule config
        var baseUrl = '/angularjs/post/views/';
        var template = 'post-teaser.html';

        var templateUrl = baseUrl + template;

        return {
          restrict:"EA",
          templateUrl: templateUrl,
          scope: {
            post: "="
          },
          controller: 'PostItemController'
        };
      }
    ]);
  });
}());