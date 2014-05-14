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

    angular.module('application.directives')
      .directive('weMenu', [
      '$compile','$location','SessionService','$rootScope', 'AUTH_EVENTS',
      function($compile, $location, SessionService, $rootScope, AUTH_EVENTS) {
        var linker = function($scope, $element, $attrs) {

          var constructMenuLinks = function constructMenuLinks(){
            var menu = $element.find('ul.menu');
            var link;

            $scope.links.forEach(function(item){
              var link = '<li>';

              link += '<a href="'+item.url+'" title="'+item.title+'"">';
              if(item.beforeText){
                link += item.beforeText;
              }
              link += item.content;
              link += '</li></a>';
              menu.append(link);

            });
          };

          var doAfterLoginSuccess = function doAfterLoginSuccess(){
            constructMenuLinks();
          };

          var doAfterLogoutSuccess = function doAfterLogoutSuccess(){
            constructMenuLinks();
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
          restrict:"E",
          link: linker,
          scope: false,
          template: '<nav class="menu-sidebar-nav"><h4 class="menu-title">{{title}}</h4><ul class="menu nav"></ul></nav>'

        };
      }
    ]);
  });
}());
