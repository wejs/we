(function() {

  define(['angular'], function ( angular ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('userMenu', [
      '$compile', '$rootScope',
      function($compile, $rootScope) {

        var setUserMenu = function(scope, element, attrs){

          if( $rootScope.user && $rootScope.user.authorized){

            var html = '<ul class="user-menu">';
            html += '<li>Oi mundo';
            html += '</li>';

            html += '<li>';
            html += '<a href="/users/logout">Exit</a>';
            html += '</li>';

            html += '</ul>';

            element.html( $compile(html)(scope) );
          }else {
            element.html( '' );
          }
        };


        return {
          restrict:"EA",
          link: function (scope, element, attrs) {
            setUserMenu(scope, element, attrs);
            $rootScope.$watch('user.authorized', function () {
              setUserMenu(scope, element, attrs);
            });
          }
        };
      }
    ]);
  });
}());
