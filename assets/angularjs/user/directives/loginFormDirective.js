
(function() {

  define(['angular', 'user/user'], function (angular) {

    return angular.module('application.directives')
      .directive('loginForm', [
      '$compile','$http', '$templateCache', '$rootScope',
      function($compile, $http, $templateCache, $rootScope) {
        var baseUrl = '/angularjs/user/views/';
        var template = 'login-form.html';
        var templateUrl = baseUrl + template;

        var linker = function(scope, element, attrs) {
          $rootScope.$watch('user.authorized', function () {
            if($rootScope.user.authorized){
              scope.authorized = true;
            } else {
              scope.authorized = false;
            }
          });
        };

        return {
          templateUrl: templateUrl,
          restrict:"EA",
          link: linker
        };
      }
    ]);
  });
}());