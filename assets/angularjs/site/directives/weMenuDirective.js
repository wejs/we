/**
 * We menu directive to render menus
 * RefecenceLinks:
 *   https://ryankaskel.com/blog/2013/05/27/a-different-approach-to-angularjs-navigation-menus#update
 */

(function() {

  define('site/directives/weMenuDirective',[
    'angular',
    'auth/factories/SessionService'
    ], function ( angular ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('weMenu', [
      '$compile','$location','SessionService','$rootScope', 'AUTH_EVENTS',
      function($compile, $location, SessionService, $rootScope, AUTH_EVENTS) {
        var linker = function($scope, $element, $attrs) {

          var menu = $element.find('ul.menu');
          $scope.authorized = SessionService.authorized();

          // Login Event
          $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, next) {
            $scope.authorized = true;
          });

          // logout Event
          $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, next) {
            $scope.authorized = false;
          });

          $scope.links.forEach(function(item){
             var link = '<li><a href="'+item.url+'" title="'+item.title+'"">'+ item.content +'</li></a>';
             menu.append(link);
            });

        };
        return {
          restrict:"E",
          link: linker,
          scope: false,
          template: '<div class="well sidebar-nav" data-ng-show="authorized"><ul class="menu nav"><li>{{title}}</li></ul></div>'

        };
      }
    ]);
  });
}());
