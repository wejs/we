
define([
  'angular',
  '$socket',
  'angular-resource'
], function (
  angular,
  $socket,
  ngResource
) {

  // --- MODULE ---
  angular.module('admin', [
    'ngResource','ngRoute', 'ui.router', 'ui.bootstrap'
  ])
  .config([ '$locationProvider','$httpProvider','$stateProvider', '$urlRouterProvider',
    function( $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('admin', {
        url: "/admin",
        templateUrl: wejs.getTemplateUrl("admin/views/widgetsIndex.html")
      })
      .state('adminWidgets', {
        url: "/admin/widgets",
        views: {
          "": {
            templateUrl:  wejs.getTemplateUrl("admin/views/widgetsIndex.html"),
            controller: 'WidgetsController'
          }
        }
      })
      .state('admin.roles', {
        url: "/roles",
        views: {
          "": {
            templateUrl:  wejs.getTemplateUrl("admin/views/roles.html")
          }
        },
        controller: function(){
          console.log('no admin.roles');
        }
      });

    }
  ]);

  angular.module("admin")
  .controller("WidgetsController", [
    "$scope",
    "$http",
    "$location",
    "WidgetsResource",
    function($scope, $http, $location, WidgetsResource ) {
      /*
      WidgetsResource.query(function(data) {
        console.log('widgets', data);
      }, function(error) {
        console.log('error on get widgets', error);
      });
      */
      $scope.widgets = wejs.widgets;

      $scope.regions = wejs.config.regions;
    }
  ]);

  angular.module("admin")
  .controller("WidgetController", [
    "$scope",
    "$http",
    "$location",
    "WidgetsResource",
    function($scope, $http, $location, WidgetsResource ) {

      $scope.widget = $scope.$parent.widget;

      $scope.scopeDataConfigs = [];
      $scope.scopeDataConfigFormOptions = {};

      if(wejs.widgets[$scope.widget.type].scopeDataConfigs){
        $scope.scopeDataConfigs = wejs.widgets[$scope.widget.type].scopeDataConfigs;

        $scope.scopeDataConfigs.forEach(function(e,i){
          e['default'] = $scope.widget.scopeData[i].value;
        })
      }

      if(wejs.widgets[$scope.widget.type].scopeDataConfigFormOptions){
        $scope.scopeDataConfigFormOptions = wejs.widgets[$scope.widget.type].scopeDataConfigFormOptions;
      }

      console.log(wejs.widgets[$scope.widget.type])
      console.log('$scope',$scope);
    }
  ]);


  angular.module("admin")
  .factory("WidgetsResource", [
    "$resource",
    function ($resource) {
    // We need to add an update method
    return $resource(
       "/widgets/:id", {
          id: "@id"
        }, {
          update: {
            method: 'PUT'
          }
        }
    );
  }]);

});