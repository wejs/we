
(function() {

  define(['angular'], function (angular) {

    return angular.module('application.directives')
      .directive('weMessenger', [
      '$compile','$http', '$templateCache',
      function($compile, $http, $templateCache) {

        var getTemplate = function() {
          var templateLoader;
          // TODO move this template url to angular submodule config
          var baseUrl = '/app/messenger/views/';
          var template = 'contact-list.html';

          var templateUrl = baseUrl + template;
          templateLoader = $http.get(templateUrl, {cache: $templateCache});

          return templateLoader;

        }

        var linker = function(scope, element, attrs) {

            var loader = getTemplate();

            var promise = loader.success(function(html) {
                element.html(html);
            }).then(function (response) {
                element.replaceWith($compile(element.html())(scope));
            });
        };

        return {
          restrict:"A",
          link: linker
        };
      }
    ]);
  });
}());