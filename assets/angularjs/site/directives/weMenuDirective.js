/**
 * We menu directive to render menus
 * RefecenceLinks:
 *   https://ryankaskel.com/blog/2013/05/27/a-different-approach-to-angularjs-navigation-menus#update
 */

(function() {

  define(['angular'], function ( angular ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('weMenu', [
      '$compile','$location',
      function($compile, $location) {
        var linker = function($scope, $element, $attrs) {

          var menu = $element.find('ul.menu');

          $scope.links;

          $scope.links.forEach(function(item){
             var link = '<li><a href="'+item.url+'" title="'+item.title+'"">'+ item.content +'</li></a>';
             menu.append(link);
          });

          // TODO add suport to active links class
          /*
          $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

            // Remove active from all links
            $element.find('a').removeClass('active');

            var currentLink = $element.find('a[href$="'+ $location.path() +'"]');
            if( currentLink.addClass) {
              currentLink.addClass('active');
            }

          });
          */

        };
        return {
          restrict:"E",
          link: linker,
          scope: false,
          template: '<div class="well sidebar-nav"><ul class="menu nav"><li>{{title}}</li></ul></div>'

        };
      }
    ]);
  });
}());
