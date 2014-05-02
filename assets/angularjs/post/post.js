define('post/post', [
  'angular',
  '$socket',
  'angular-resource',
  'wejs.config',
  'comment/comment',
], function (
  angular,
  $socket,
  ngResource
) {
  var module = angular.module('post', [
    'ngResource','ngRoute', 'ui.router', 'ui.bootstrap', 'comment'
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
        resolve: {
          // load dependences
          deps: function($q){
            return wejs.load($q, [
              'user/directives/weUserNameDirective'
            ])
          }
        },
        views: {
          "": {
            controller: 'PostItemController',
            templateUrl: wejs.getTemplateUrl("post/views/post.html")
          }
        }
      })
      .state('post.edit', {
        url: "/edit",
        onEnter: function($stateParams, $state, $modal, $resource, postShowResolver) {
          $modal.open({
            templateUrl: wejs.getTemplateUrl("post/views/post.html"),
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

  return module;
});


// load module components like directives or controllers
requirejs([
  'post/factories/PostResource',
  'post/controllers/PostController',
  'post/controllers/PostItemController',
  'post/directives/shareboxDirective',
  'post/directives/postTeaserDirective'
]);