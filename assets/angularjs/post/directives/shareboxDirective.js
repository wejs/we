
(function() {

  define(['angular', 'post/post'], function (angular) {

    return angular.module('application.directives')
      .directive('weSharebox', [
      '$compile','$http', '$templateCache', '$rootScope',
      function($compile, $http, $templateCache, $rootScope) {

        // TODO move this template url to angular submodule config
        var baseUrl = '/angularjs/post/views/';
        var template = 'sharebox.html';

        var templateUrl = baseUrl + template;

        return {
          restrict:"EA",
          templateUrl: templateUrl,
          transclude: true,
          scope: {
            posts : '='
          },
          controller: function($scope, $element, $attrs, $rootScope, PostResource) {

            $scope.sharebox = {};
            $scope.sharebox.open = false;

            post = {};

            // Open sharebox footer
            $scope.openSharebox = function(){
              $scope.sharebox.open = true;
            };

            // close sharebox footer
            $scope.closeSharebox = function(){
              $scope.sharebox.open = false;
            };

            // Submit to create one post
            $scope.submit = function($event, post ){
              $event.preventDefault();
              $event.stopPropagation();

              Post = new PostResource({
                'text': post.content
              });

              Post.$save( function(data, headers) {

                if(data.post){
                  // convert simple post object in post resource object
                  var postR = new PostResource(data.post);

                  // update root posts cache
                  $rootScope.posts[data.post.id] = postR;

                  // update parent posts list
                  jQuery('#posts').scope().posts.unshift(postR);

                }

                $scope.closeSharebox();

                $scope.post = {};

              }, function(err, headers) {
                // error here
                // TODO
                console.error('error: ',err);
              });

            };
          }
        };
      }
    ]);
  });
}());
