(function() {

  define('site/directives/weRegionDirective',['angular', 'news/news'], function ( angular ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('weRegion', [
      '$compile', '$http','$rootScope', 'AUTH_EVENTS',
      function($compile, $http, $rootScope, AUTH_EVENTS) {


        var linker = function ($scope, $element, attrs){

          if(!attrs.name){
            return console.error('Region name attribute is required!');
          }

          $scope.region = wejs.config.regions[attrs.name];


          // Login Event
          $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, next) {

            $scope.region.widgets.forEach(function(widget,i){

              // compile and generate the widget
              var widgetTag = '<' +widget.type+ '></'+widget.type+'>';

              var newScope = $scope.$new();

              // if has scope vars in widget config ...
              if(widget.scopeData){
                // set variables inside new element
                widget.scopeData.forEach(function(data){
                  newScope[data.name] = data.value;
                });
              }

              var compiledWidget = $compile( widgetTag, 'x' )( newScope );

              $element.append( compiledWidget );

            });
          });

          // logout Event
          $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, next) {
            $element.text('');
          });

        }

        return {
          restrict: "E",
          link: linker
        };
      }
    ]);
  });
}());
