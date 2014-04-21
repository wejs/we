define([
  'angular',
  '$socket',
  'angular-resource',
  'modules',
  './directives/shareboxDirective',
  './directives/postTeaserDirective'
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
      /*
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
      */
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
      }, {
        'update': { method:'PUT' }
      });
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

      // show edit form
      $scope.edit = function() {
        // save one back
        $scope.post_old = angular.copy($scope.post);

        $scope.post.editing = true;
      };

      $scope.cancelEdit = function() {
        console.log($scope.post_old);
        $scope.post = angular.copy($scope.post_old);

        $scope.post.editing = false;
      };

      // Update post on server
      $scope.update = function() {
        delete($scope.post.editing);

        $scope.post.$update( function(data, headers) {
          console.log('headers',headers);
          if(data.post){
            // update root posts cache
            $rootScope.posts[data.post.id] = $scope.post;

            // update parent posts list
            //jQuery('#posts').scope().posts.unshift($scope.post);
          }

          $scope.post.editing = false;
        }, function(err, headers) {
          // error here
          // TODO
          console.error('error: ',err);
        });
      };

      // delete the scope post
      $scope["delete"] = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var post_id = $scope.post.id;

        if (confirm('Permanently delete this post?')) {
          $scope.post.$delete(function() {
            // search post in posts list and remove it
            jQuery('#posts').scope().posts.forEach( function(item, key){
              if(item.id == post_id){
               jQuery('#posts').scope().posts.splice(key, 1);
              }
            });
          });
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
    "$rootScope","$scope", "SessionService", "PostResource",  "$route", "$routeParams",
    function($rootScope, $scope, SessionService, PostResource,  $route, $routeParams) {
      var init;
      var show;

      if(!$rootScope.posts) $rootScope.posts = {};

      init = function (){
        /*
        $scope.posts = postData;

        postData.forEach( function(post){
          $rootScope.posts[post.id] = post;
        });
        */
        postData = PostResource.query(function() {
          $scope.posts = postData;
          postData.forEach( function(post){
            $rootScope.posts[post.id] = post;
          });
        }, function(error) {
          console.error('PostController: Error in get posts', error);
        });


      };

      // get new items from server
      $scope.getNews = function(){

      };

      // get olds items from server
      $scope.getOlds= function(){

      };

      return init();
    }
  ]);

});