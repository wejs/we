/**
 * PostController
 */
define('post/controllers/PostController',[
    'angular',
    'post/post',
    'post/factories/PostResource',
    'auth/factories/SessionService'
  ], function (
    angular,
    module
  ) {

  module.controller("PostController", [
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