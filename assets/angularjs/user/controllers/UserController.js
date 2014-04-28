/**
 * UserController
 */
define('user/controllers/UserController',[
    'angular',
    'user/user',
    'auth/factories/SessionService',
    'user/factories/UserResource'
  ], function (
    angular,
    userModule
  ) {

  userModule.controller("UserController", [
    "$rootScope","$scope", "SessionService", "UserResource", "usersData", "$route", "$routeParams",
    function($rootScope, $scope, SessionService, UserResource, usersData, $route, $routeParams) {
      var init;
      var show;

      if(!$rootScope.users)
        $rootScope.users = {};

      init = function (){
        console.log('users',usersData);
        $scope.users = usersData;
        //$rootScope.activities = usersData;
      };

      show = function ($scope, $routeParams){
        console.log('no show');
        console.log('$routeParams', $routeParams);
      };

      $scope.dismiss = function() {
        console.log('no dismiss',$scope);
        $scope.$dismiss();
      };

      $scope.edit = function(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log($scope);
        return console.log('edit');
      };

      $scope["delete"] = function(index, event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('delete');
        console.log(new ActivityResource({
          'activity': $scope.activities[index]
        }));
        if (confirm('Permanently delete this post?')) {
          console.log($scope.activities[index]);
          $scope.activities[index].$delete();
          return $scope.activities.splice(index, 1);
        }
      };

      $scope.submit = function(event, activity) {
        event.preventDefault();
        event.stopPropagation();

        var Activity;

        Activity = new ActivityResource({
          'text': activity.content
        });

        Activity.$save(function(data, headers) {

          console.log('Activity.$save', data);
          if(data.activity){
            $scope.activities.unshift(data.activity);
          }

          $scope.closeSharebox();
          jQuery('.sharebox textarea').val('');

        }, function(err, headers) {
          // error here
          // TODO
          console.error('error: ',err);
        });

      };

      return init();

    }
  ]);
});
