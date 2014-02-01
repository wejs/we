
(function() {

  define(['angular', 'user'], function (angular) {

    return angular.module('application.user')
      .directive('loginForm', [
      '$compile','$http', '$templateCache', '$rootScope',
      function($compile, $http, $templateCache, $rootScope) {

        var getTemplate = function() {
          var templateLoader;
          // TODO move this template url to angular submodule config
          var baseUrl = '/angularjs/user/views/';
          var template = 'login-form.html';

          var templateUrl = baseUrl + template;
          templateLoader = $http.get(templateUrl, {cache: $templateCache});

          return templateLoader;

        };

        var setLoginForm = function(element, html, attrs, scope){
          if( $rootScope.user && !$rootScope.user.authorized){
            element.html( $compile(html)(scope) );
            //scope.$apply();
          } else if($rootScope.user) {
            element.html('');
          }
        };

        var linker = function(scope, element, attrs) {
          var loader = getTemplate();

          // preload login form
          var promise = loader.success(function(html) {

            setLoginForm(element, html, attrs, scope);

            $rootScope.$watch('user.authorized', function () {

              setLoginForm(element, html, attrs, scope);

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