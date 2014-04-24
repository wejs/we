
(function() {

  define(['angular', 'user/user'], function (angular) {

    return angular.module('application.directives')
      .directive('signupForm', [
      '$compile','$http', '$rootScope',
      function($compile, $http, $rootScope) {

        var linker = function(scope, element, attrs) {
          console.log('oi mundo');
        };

        return {
          templateUrl: wejs.getTemplateUrl('user/views/signup-form.html'),
          restrict:"EA",
          link: linker
        };
      }
    ]);
  });
}());