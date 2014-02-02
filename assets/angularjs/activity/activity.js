define([
  'angular',
  '$socket',
  'angular-resource'
], function (
  angular,
  $socket,
  ngResource
) {
  angular.module('activity', [
    'ngResource','ngRoute', 'ui.router', 'ui.bootstrap'
  ]).
  config([ '$locationProvider','$httpProvider','$stateProvider', '$urlRouterProvider',
    function( $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

        $stateProvider
        // --- ACTIVITY
        .state('ActivityController', {
          url: "/activity",
          templateUrl: "/angularjs/activity/views/index.html",
          controller: 'ActivityController',
          resolve: {
            activitiesData: function(activityResolver){
              console.log('resolvendo');
              return activityResolver();
            }
          }
        })
        .state('ActivityController.activity', {
          url: "/:id",
          onEnter: function($stateParams, $state, $modal, $resource, activityShowResolver) {
            $modal.open({
              templateUrl: "/angularjs/activity/views/activity.html",
              controller: 'ActivityItemController',
              resolve: {
                activity: function(activityShowResolver){
                  return activityShowResolver($stateParams);
                }
              }
            }).result.then(function(result) {
              console.info('no activity then',result);
              return $state.transitionTo("ActivityController");
            }, function () {
              console.info('Modal dismissed at: ' + new Date());
              return $state.transitionTo("ActivityController");
            });
          }
        })
        .state('ActivityController.activity.edit', {
          url: "/edit",
          onEnter: function($stateParams, $state, $modal, $resource, activityShowResolver) {
            $modal.open({
              templateUrl: "/angularjs/activity/views/activity.html",
              controller: 'ActivityItemController',
              resolve: {
                activity: function(activityShowResolver){
                  return activityShowResolver($stateParams);
                }
              }
            }).result.then(function(result) {
              console.info('no activity edit then',result);
              return $state.transitionTo("ActivityController");
            }, function () {
              console.info('Modal edited dismissed at: ' + new Date());
              return $state.transitionTo("ActivityController");
            });
          }
        });
    }
  ]);

  // --- RESOURCES
  angular.module('activity')
  .factory('ActivityResource',[
    '$resource',
    function($resource){
      var ActivityResource;
      ActivityResource = $resource('/activity/:id', {
        id: '@id'
      }, {});
      return ActivityResource;
    }
  ]);

  // --- RESOLVERS ---
  angular.module('activity')
  .factory('activityResolver',[
    '$http',
    '$q',
    'ActivityResource',
    function($http,$q, ActivityResource){
      return function () {
        var deferred = $q.defer();
        var activities;
        activities = ActivityResource.query(function() {
          return deferred.resolve(activities);
        }, function(error) {
          return deferred.reject(error);
        });

        return deferred.promise;
      };
  }])
  .factory('activityShowResolver',[
    '$rootScope',
    '$http',
    '$q',
    'ActivityResource',
  function($rootScope, $http,$q, ActivityResource){
    return function ($stateParams) {
      var deferred = $q.defer();

      // get from cache
      if($rootScope.activities && $rootScope.activities[$stateParams.id]){
        return $rootScope.activities[$stateParams.id];
      }else{
        ActivityResource.get({
          id: $stateParams.id
        }, function(activitie, getResponseHeaders){
          return deferred.resolve(activitie);
        }, function(error) {
          return deferred.reject(error);
        });
      }

      return deferred.promise;
    };
  }]);

  // --- CONTROLERS ---
  angular.module("activity")
  .controller("ActivityItemController", [
    "$rootScope","$scope", 'ActivityResource', 'activity', '$modalInstance',
    function($rootScope, $scope, ActivityResource, activity, $modalInstance) {
      var show;

      if(!$rootScope.activities)
        $rootScope.activities = {};

      if($rootScope.activities[activity.id]){
        $scope.activity = $rootScope.activities[activity.id];
      } else {
        $rootScope.activities[activity.id] = activity;
        $scope.activity = activity;
      }

      $scope.$watch('$rootScope.activities[$scope.activity]', function() {
        $scope.activity = $rootScope.activities[$scope.activity.id];
        // do something here
        console.info('$rootScope.activities[activity.id]',$rootScope.activities[$scope.activity.id]);
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
    }

  ]);

  angular.module("activity")
  .controller("ActivityController", [
    "$rootScope","$scope", "SessionService", "ActivityResource", "activitiesData",  "$route", "$routeParams",
    function($rootScope, $scope, SessionService, ActivityResource, activitiesData,  $route, $routeParams) {
      var init;
      var show;

      if(!$rootScope.activities)
        $rootScope.activities = {};

      init = function (){
        console.log(activitiesData);
        $scope.sharebox = {};
        $scope.sharebox.open = false;
        $scope.activities = activitiesData;
        $rootScope.activities = activitiesData;
      };
      return init();
    }
  ]);

});