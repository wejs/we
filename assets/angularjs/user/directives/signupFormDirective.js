
(function() {

  define(['angular', 'user/user'], function (angular) {

    return angular.module('application.directives')
      .directive('signupForm', [
      '$compile','$http', '$rootScope',
      function($compile, $http, $rootScope) {

        return {
          templateUrl: wejs.getTemplateUrl('user/views/signup-form.html'),
          restrict:"EA"
        };
      }
    ]);
  });
}());