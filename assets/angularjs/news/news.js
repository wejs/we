define('news/news',[
  'angular',
  'angular-resource',
  'modules',
  './directives/activityDirective',
  'auth/factories/SessionService'
], function (
  angular,
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
    'SessionService',
    '$rootScope',
    'AUTH_EVENTS',
    function(
      $scope,
      $stateParams,
      ActivityResource,
      SessionService,
      $rootScope,
      AUTH_EVENTS
    ) {

      $socket = we.io.socket;

      $scope.activities = [];

      var getActivities = function getActivitiesFunc(){
        ActivityResource.query(function(data) {
          data.forEach(function(item, i){
            item = formatTitle(item);
            $scope.activities.push(item);
          });

        }, function(error) {
          console.error('NewsController: Error in get activities', error);
        });
      };

      var formatTitle = function formatTitleFunc(activity){
        console.log(activity);
        if(activity.verb == 'post'){

          var username = activity.actor.name;
          var displayName = '<a href="'+activity.target.url+'">'+ activity.target.displayName + '</a>';

          activity.title = username+' created the post '+displayName;

        }else if(activity.verb == 'comment'){
          if(activity.actor && activity.actor.name && activity.target.model){
            var username = activity.actor.name;
            var displayName = '<a href="'+activity.target.url+'">'+ activity.target.displayName + '</a>';

            activity.title =  username+' comentou '+displayName+' no conteúdo '+ activity.target.model.text;
          }else{
            console.warn('Data not found in news');
          }

        }

        return activity;
      };

      var showBlock = function showblock(){
        $scope.authorized = true;
        getActivities();
      };

      var hideBlock = function hideBlock(){
        $scope.authorized = false;
        $scope.activities = [];
      };

      if( SessionService.authorized() ){
        showBlock();
      }else {
        hideBlock();
      }

      // Login Event
      $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, next) {
        showBlock();
      });

      // logout Event
      $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, next) {
        hideBlock();
      });

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