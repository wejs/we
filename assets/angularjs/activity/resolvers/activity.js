 (function() {

  define(['angular', "modules"], function (angular) {

    'use strict';

    return angular.module('application.activity')
      .factory('activityResolver',[
      '$http',
      '$q',
      'ActivityResource',
      function($http,$q, ActivityResource){
        return function () {
          var deferred = $q.defer();
    /*
          $http.get( '/activity' )
          .success(function(data){
              return deferred.resolve(data);
          }).error(function(data, status) {
              return deferred.reject(data);
          });
          ActivityResource.query(

          )
    */
          var activities;
          activities = ActivityResource.query(function() {
            return deferred.resolve(activities);
          }, function(error) {
            return deferred.reject(error);
          });

          return deferred.promise;
        }
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

  });
}());