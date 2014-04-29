/**
 * commentsDirective
 */
define('comment/directives/commentsDirective',[
  'angular',
  'comment/comment',
  'comment/controllers/CommentsController',
  'comment/factories/commentService'
], function (
  angular,
  module
) {

  module.directive('weComments', [
    '$compile',
    'commentService',
    function($compile, commentService) {
      var linker = function($scope, $element, $attrs) {

        $scope.model_id = $attrs.modelId;
        $scope.model_name = $attrs.modelName;

        commentService.resource.query(
          {
            model_id: $scope.model_id,
            model_name: $scope.model_name
          },
          function(data) {
            $scope.comments = data;
        }, function(error) {
          console.error('CommentsController:CommentResource.query: ', error);
        });

      };
      return {
        restrict:"E",
        link: linker,
        controller: 'CommentsController',
        scope: false,
        templateUrl: wejs.getTemplateUrl('comment/views/comments.html')

      };
    }
  ]);

});
