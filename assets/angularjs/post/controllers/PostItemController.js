/**
 * PostItemController
 */
define('post/controllers/PostItemController',[
    'angular',
    'post/post',
    'post/factories/PostResource'
  ], function (
    angular,
    module
  ) {

  module.controller("PostItemController", [
    "$rootScope","$scope", 'PostResource', '$stateParams', 'SessionService',
    function($rootScope, $scope, PostResource, $stateParams, SessionService) {
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

        var user = SessionService.getUser();

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

});