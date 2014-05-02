

/**
 * User menu Directive
 */
define('user/directives/weUserNameDirective',[
  'angular',
  'user/user',
  'application',
  'user/factories/UserService'
  ], function (
    angular,
    module,
    app
  ){

  app.plugDirective('weUserName',[
    '$compile',
    'UserService',
  function($compile, UserService){
    var linker = function($scope, $element, $attrs) {
      $scope.$watch('id', function(newValue, oldValue) {
        if(newValue){
          UserService.getUser(newValue, function(err, user){
            $scope.name = user.name;
            $scope.url = '/users/' + user.id;
          });
        }else{
           $scope.name = '';
           $scope.url = '';
        }
      });
    };

    return {
      restrict:"EA",
      link: linker,
      scope: {
        id: '=userId',
      },
      template: '<a href="{{url}}">{{name}}</a>'
    }
  }]);
});

