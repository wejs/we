(function() {

  define(['angular', 'news/news'], function ( angular ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('activity', [
      '$compile', '$rootScope', '$http','$sce',
      function($compile, $rootScope, $http, $sce) {
        var linker = function($scope, element, attrs) {
          $scope.text = $sce.trustAsHtml(attrs.ativityTitle);
          $scope.actorId = attrs.actorId;
        };
        return {
          restrict:"EA",
          link: linker,
          templateUrl: wejs.getTemplateUrl('news/views/activityItem.html')
        };
      }
    ]);
  });
}());
