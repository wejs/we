/**
 * Login form Directive
 */
define('user/directives/loginFormDirective',[
    'angular',
    'user/user',
    'auth/factories/SessionService'
  ], function (
    angular,
    userModule
  ) {

  return userModule.directive('loginForm', [
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
        templateUrl: wejs.getTemplateUrl('user/views/login-form.html'),
        restrict:"EA",
        link: linker
      };
    }
  ]);
});
