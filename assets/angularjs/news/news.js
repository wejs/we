define('news/news',[
  'angular',
  '$socket',
  'angular-resource',
  'modules',
  './directives/activityDirective',
  'auth/factories/SessionService'
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
    "$scope",
    '$stateParams',
    'ActivityResource',
    '$socket',
    'SessionService',
    function(
      $scope,
      $stateParams,
      ActivityResource,
      $socket,
      SessionService
    ) {

      $scope.activities = [];

      ActivityResource.query(function(data) {
        data.forEach(function(item, i){
          item = formatTitle(item);
          $scope.activities.push(item);
        });

      }, function(error) {
        console.error('NewsController: Error in get activities', error);
      });

      var formatTitle = function(activity){
        console.log(activity);
        if(activity.verb == 'post'){

          var username = activity.actor.name;
          var displayName = '<a href="'+activity.target.url+'">'+ activity.target.displayName + '</a>';

          activity.title = username+' created the post '+displayName;

        }else if(activity.verb == 'comment'){

          var username = activity.actor.name;
          var displayName = '<a href="'+activity.target.url+'">'+ activity.target.displayName + '</a>';

          activity.title =  username+' comentou '+displayName+' no conteúdo '+ activity.target.model.text;
        }

        return activity;
      }

      /**
       * Receive a messenger message
       * @param  Object data
       */
      $socket.on("activity:new", function(data) {
        console.info('new activity',data);

        if(data.item){
          var user = SessionService.getUser();
          if(user.id && user.id != data.item.actor_id ){
            data.item = formatTitle(data.item);
            $scope.activities.unshift(data.item);
            $scope.$apply();
          }
        }
      });

    }
  ]);

  // Diretives
  angular.module('news')
  .directive('weNews', [
    '$compile','$http',
    function($compile, $http) {

      return {
        templateUrl: wejs.getTemplateUrl('news/views/news-block.html'),
        restrict:"EA",
        controller: 'NewsController'
      };
    }
  ]);

});