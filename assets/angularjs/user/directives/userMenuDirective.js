/**
 * User menu Directive
 */
define('user/directives/userMenuDirective',[
  'angular',
  'user/user',
  'auth/factories/SessionService'
  ], function (
    angular,
    userModule
  ){

  userModule.directive('userMenu', [
    '$compile', '$rootScope', '$http', 'SessionService', 'AUTH_EVENTS',
    function($compile, $rootScope, $http, SessionService, AUTH_EVENTS) {
      var linker = function(scope, element, attrs) {

        if( SessionService.authorized() ){
          element.show();
        }else {
          element.hide();
        }

        // Login Event
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, next) {
          element.show();
        });

        // Log out event
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, next) {
          element.hide();
        });

      };
      return {
        restrict:"EA",
        link: linker,
        templateUrl: wejs.getTemplateUrl('user/views/user-menu.html')
      };
    }
  ]);
});

