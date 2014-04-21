define([
  'angular',
  '$socket',
  'angular-resource',
  'modules'
], function (
  angular,
  $socket,
  ngResource
) {
  angular.module('news', [
    'ngResource','ngRoute', 'ui.router', 'ui.bootstrap'
  ]).
  config([ '$locationProvider','$httpProvider','$stateProvider', '$urlRouterProvider',
    function( $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
      // TODO
      // Add news urls here

    }
  ]);


  // --- RESOURCES
  angular.module('news')
  .factory('ActivityResource',[
    '$resource',
    function($resource){
      return $resource('/activity/:id', {
        id: '@id'
      }, {
        'update': { method:'PUT' },
        'query': {
          isArray: true,
          transformResponse: function(data, headers){
            // return only data.items
            var jsonData = angular.fromJson(data);

            if(jsonData.items){
              return jsonData.items;
            }else{
              return [];
            }
          }
        },
        'get': {
          isArray: false,
          transformResponse: function(data, headers){
            // return only data.items
            var jsonData = angular.fromJson(data);

            if(jsonData.item){
              return jsonData.item;
            }else{
              return {};
            }
          }
        }
      });
    }
  ]);

  // --- CONTROLERS ---
  angular.module("news")
  .controller("NewsController", [
    "$scope", '$stateParams', 'ActivityResource', '$socket',
    function($scope, $stateParams, ActivityResource, $socket) {

      $scope.activities = [];

      ActivityResource.query(function(data) {
        $scope.activities = data;
      }, function(error) {
        console.error('NewsController: Error in get activities', error);
      });

      /**
       * Receive a messenger message
       * @param  Object data
       */
      $socket.on("activity:new", function(data) {
        console.info('new activity',data);

        if(data.item){
          $scope.activities.push(data.item);
          $scope.$apply();
        }


      });


    }
  ]);

  // Diretives
  angular.module('news')
  .directive('weNews', [
    '$compile','$http',
    function($compile, $http) {
      var baseUrl = '/angularjs/news/views/';
      var template = 'news-block.html';
      var templateUrl = baseUrl + template;

      var linker = function(scope, element, attrs) {

      };

      return {
        templateUrl: templateUrl,
        restrict:"EA",
        link: linker,
        controller: 'NewsController'
      };
    }
  ]);

});