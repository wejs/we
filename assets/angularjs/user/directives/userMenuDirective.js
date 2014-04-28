(function() {

  define('user/directives/userMenuDirective',['angular', 'user/user'], function ( angular ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('userMenu', [
      '$compile', '$rootScope', '$http',
      function($compile, $rootScope, $http) {
        var linker = function(scope, element, attrs) {
          $rootScope.$watch('user.authorized', function () {
            if( $rootScope.user && $rootScope.user.authorized){
              scope.user.authorized = $rootScope.user.authorized;
            }else {
              scope.user.authorized = false;
            }
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
}());
