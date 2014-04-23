
(function() {

  define(['angular', 'user/user'], function (angular) {

    return angular.module('application.directives')
      .directive('loginForm', [
      '$compile','$http', '$rootScope',
      function($compile, $http, $rootScope) {

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
          templateUrl: wejs.getTemplateUrl('user/views/login-form.html'),
          restrict:"EA",
          link: linker
        };
      }
    ]);
  });
}());