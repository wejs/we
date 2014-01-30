(function() {

  define(['angular'], function ( angular ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('userMenu', [
      '$compile', '$rootScope', '$http', '$templateCache',
      function($compile, $rootScope, $http, $templateCache) {

        var getTemplate = function() {
          var templateLoader;
          // TODO move this template url to angular submodule config
          var baseUrl = '/angularjs/user/views/';
          var template = 'user-menu.html';

          var templateUrl = baseUrl + template;
          templateLoader = $http.get(templateUrl, {cache: $templateCache});

          return templateLoader;

        };

        var setUserMenu = function(scope, element, attrs, html){

          if( $rootScope.user && $rootScope.user.authorized){

            element.html( $compile(html)(scope) );

            /*
            var html = '<ul class="user-menu">';
            html += '<li>Oi mundo';
            html += '</li>';

            html += '<li>';
            html += '<a href="/users/logout">Exit</a>';
            html += '</li>';

            html += '</ul>';

            element.html( $compile(html)(scope) );

            */
          }else {
            element.html( '' );
          }
        };


        var linker = function(scope, element, attrs) {
          var loader = getTemplate();

          // preload login form
          var promise = loader.success(function(html) {

            setUserMenu(scope, element, attrs, html);

            $rootScope.$watch('user.authorized', function () {

              setUserMenu(scope, element, attrs, html);

            });

          }).then(function (response) {
            // TODO show error here
            //element.replaceWith($compile(element.html())(scope));
          });
        };
        return {
          restrict:"EA",
          link: linker
        };
      }
    ]);
  });
}());
