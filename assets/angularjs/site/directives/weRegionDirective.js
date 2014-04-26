(function() {

  define(['angular', 'news/news'], function ( angular ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('weRegion', [
      '$compile', '$http',
      function($compile, $http) {


        var linker = function ($scope, $element, attrs){

          if(!attrs.name){
            return console.error('Region name attribute is required!');
          }

          $scope.region = wejs.config.regions[attrs.name];

          $scope.region.widgets.forEach(function(widget,i){

          // compile and generate the widget
          var widgetTag = '<' +widget.type+ ' li="region['+i+'].scopeData"></'+widget.type+'>';

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
        }

        return {
          restrict: "E",
          link: linker
        };
      }
    ]);
  });
}());
