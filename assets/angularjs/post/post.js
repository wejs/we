define([
  'angular',
  '$socket',
  'angular-resource'
], function (
  angular,
  $socket,
  ngResource
) {
  angular.module('post', [
    'ngResource','ngRoute', 'ui.router', 'ui.bootstrap'
  ]).
  config([ '$locationProvider','$httpProvider','$stateProvider', '$urlRouterProvider',
    function( $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

      $stateProvider
      // --- POST
      .state('posts', {
        url: "/post",
        templateUrl: "/angularjs/post/views/index.html",
        controller: 'PostController',
        resolve: {
          postData: function(postResolver){
            console.log('resolvendo');
            return postResolver();
          }
        }
      })
      .state('post', {
        url: "/post/:id",
        views: {
          "": {
            templateUrl: "/angularjs/post/views/post.html",
            controller: 'PostItemController'
          }
        }
      })
      .state('post.edit', {
        url: "/edit",
        onEnter: function($stateParams, $state, $modal, $resource, postShowResolver) {
          $modal.open({
            templateUrl: "/angularjs/post/views/post.html",
            controller: 'PostItemController',
            resolve: {
              post: function(postShowResolver){
                return postShowResolver($stateParams);
              }
            }
          }).result.then(function(result) {
            console.info('no post edit then',result);
            return $state.transitionTo("posts");
          }, function () {
            console.info('Modal edited dismissed at: ' + new Date());
            return $state.transitionTo("posts");
          });
        }
      });
    }
  ]);

  // --- RESOURCES
  angular.module('post')
  .factory('PostResource',[
    '$resource',
    function($resource){
      var PostResource;
      PostResource = $resource('/post/:id', {
        id: '@id'
      }, {});
      return PostResource;
    }
  ]);

  // --- RESOLVERS ---
  angular.module('post')
  .factory('postResolver',[
    '$http',
    '$q',
    'PostResource',
    function($http,$q, PostResource){
      return function () {
        var deferred = $q.defer();
        var posts;
        posts = PostResource.query(function() {
          return deferred.resolve(posts);
        }, function(error) {
          return deferred.reject(error);
        });

        return deferred.promise;
      };
  }])
  .factory('postShowResolver',[
    '$rootScope',
    '$http',
    '$q',
    'PostResource',
  function($rootScope, $http,$q, PostResource){
    return function ($stateParams) {
      var deferred = $q.defer();

      // get from cache
      if($rootScope.posts && $rootScope.posts[$stateParams.id]){
        return $rootScope.posts[$stateParams.id];
      }else{
        PostResource.get({
          id: $stateParams.id
        }, function(post, getResponseHeaders){
          return deferred.resolve(post);
        }, function(error) {
          return deferred.reject(error);
        });
      }

      return deferred.promise;
    };
  }]);

  // --- CONTROLERS ---
  angular.module("post")
  .controller("PostItemController", [
    "$rootScope","$scope", 'PostResource', '$stateParams',
    function($rootScope, $scope, PostResource, $stateParams) {
      var show;

      if(!$rootScope.posts) $rootScope.posts = {};

      if(!$scope.post){
        $scope.post = {};

        // get post from post cache
        if($rootScope.posts[$stateParams.id]){
          $scope.post = $rootScope.posts[$stateParams.id];
        } else {
          // if dont are in cache get from server
          PostResource.get({
            id: $stateParams.id
          }, function(post, getResponseHeaders){

            $rootScope.posts[post.id] = post;
            $scope.post = post;

          }, function(error) {
            console.error('error on post show', error);
          });
        }
      }

      $rootScope.$watch('posts.'+ $scope.post.id , function() {
        $scope.post = $rootScope.posts[$scope.post.id];
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
        console.log(new PostResource({
          'post': $scope.posts[index]
        }));
        if (confirm('Permanently delete this post?')) {
          console.log($scope.posts[index]);
          $scope.posts[index].$delete();
          return $scope.posts.splice(index, 1);
        }
      };

      $scope.submit = function(event, post) {
        event.preventDefault();
        event.stopPropagation();

        var Post;

        Post = new PostResource({
          'text': post.content
        });

        Post.$save(function(data, headers) {

          console.log('Post.$save', data);
          if(data.post){
            $scope.posts.unshift(data.post);
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

  angular.module("post")
  .controller("PostController", [
    "$rootScope","$scope", "SessionService", "PostResource", "postData",  "$route", "$routeParams",
    function($rootScope, $scope, SessionService, PostResource, postData,  $route, $routeParams) {
      var init;
      var show;

      if(!$rootScope.posts) $rootScope.posts = {};

      init = function (){
        console.log(postData);
        $scope.posts = postData;

        postData.forEach( function(post){
          $rootScope.posts[post.id] = post;
        });

      };





      return init();
    }
  ]);

});