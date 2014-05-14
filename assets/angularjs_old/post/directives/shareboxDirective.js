
(function() {

  define('post/directives/shareboxDirective',['angular', 'post/post'], function (angular) {

    return angular.module('application.directives')
      .directive('weSharebox', [
      '$compile','$http', '$rootScope',
      function($compile, $http, $rootScope) {

        return {
          restrict:"EA",
          templateUrl: wejs.getTemplateUrl('post/views/sharebox.html'),
          transclude: true,
          scope: {
            posts : '='
          },
          controller: function($scope, $element, $attrs, $rootScope, PostResource, SessionService) {

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

              var user = SessionService.getUser();


              Post.$save( function(data, headers) {
                console.warn('sarebox',data);
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
