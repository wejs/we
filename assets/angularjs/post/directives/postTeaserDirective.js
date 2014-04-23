/**
 * Directive to show a post
 * @return {[type]} [description]
 */


(function() {

  define(['angular', 'post/post'], function (angular) {

    return angular.module('application.directives')
      .directive('wePostTeaser', [
      '$compile','$http', '$rootScope' ,
      function($compile, $http, $rootScope) {

        return {
          restrict:"EA",
          templateUrl: wejs.getTemplateUrl('post/views/post-teaser.html'),
          transclude: true,
          scope: {
            post: "=",
            posts: "="
          },
          controller: 'PostItemController'
        };
      }
    ]);
  });
}());