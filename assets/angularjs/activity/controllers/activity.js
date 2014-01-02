(function() {
  "use strict";
 
  define(["angular", "modules"], function (angular) {
  
    return angular.module("application.activity")
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
}());