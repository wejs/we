(function() {
  "use strict";
 
  define(["angular", "modules"], function (angular) {
  
    return angular.module("application.user")
    .controller("UserController", [
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

    ])
    .controller("UserItemController", [
      "$rootScope","$scope", 'UserResource', 'user', '$modalInstance',
      function($rootScope, $scope, UserResource, user, $modalInstance) {
        var show;

        if(!$rootScope.users)
          $rootScope.users = {};

        if($rootScope.users[user.id]){
          $scope.user = $rootScope.users[user.id];
        } else {
          $rootScope.users[user.id] = user;
          $scope.user = user;
        }

        $scope.$watch('$rootScope.users[$scope.user]', function() {
          $scope.user = $rootScope.users[$scope.user.id];
          // do something here
          console.info('$rootScope.users[user.id]',$rootScope.users[$scope.user.id]);
        }, true);

        $scope.up = function() {
          return console.log('up');
        };

        $scope.down = function() {
          return console.log('down');
        };

        $scope.share = function() {
          return console.log('share');
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
          console.log(new UserResource({
            'user': $scope.users[index]
          }));
          if (confirm('Permanently delete this post?')) {
            console.log($scope.users[index]);
            $scope.users[index].$delete();
            return $scope.users.splice(index, 1);
          }
        };

        $scope.submit = function(event, activity) {
          event.preventDefault();
          event.stopPropagation();

          var user;

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
      }

    ]);

  });
}());