
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
          controller: function($scope, $element, $attrs, $rootScope, PostResource) {
            console.log($rootScope.user);

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

              Post.$save(function(data, headers) {

                console.log('Post.$save', data);
                if(data.post){
                  $rootScope.posts.unshift(data.post);
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