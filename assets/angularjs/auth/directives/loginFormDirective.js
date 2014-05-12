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
    '$compile','$http', '$rootScope', 'SessionService', 'AUTH_EVENTS',
    function($compile, $http, $rootScope, SessionService, AUTH_EVENTS) {

      var linker = function(scope, element, attrs) {

        var doAfterLoginSuccess = function doAfterLoginSuccess(){
          scope.authorized = true;
        };

        var doAfterLogoutSuccess = function doAfterLogoutSuccess(){
          scope.authorized = false;
        };

        if( SessionService.authorized() ){
          doAfterLoginSuccess();
        }else {
          doAfterLogoutSuccess();
        }
        // Login Event
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, next) {
          doAfterLoginSuccess();
        });

        // logout Event
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, next) {
          doAfterLogoutSuccess();
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
