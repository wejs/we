/**
 * Login form Directive
 */
define('auth/directives/loginFormDirective',[
    'angular',
    'auth/auth',
    'auth/factories/SessionService'
  ], function (
    angular,
    authModule
  ) {

  return authModule.directive('loginForm', [
    '$compile','$http', '$rootScope', 'SessionService',
    function($compile, $http, $rootScope, SessionService) {

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
        templateUrl: wejs.getTemplateUrl('auth/views/login-form.html'),
        restrict:"EA",
        link: linker
      };
    }
  ]);
});
