/**
 * commentsDirective
 */
define('comment/directives/commentFormDirective',[
  'angular',
  'comment/comment',
  'auth/factories/SessionService',
  'comment/controllers/CommentFormController'
], function (
  angular,
  module
) {

  module.directive('weCommentForm', [
    '$compile',
    'SessionService',
    function($compile, SessionService) {
      var linker = function($scope, $element, $attrs) {

        $scope.user = SessionService.getUser();

        $scope.model_id = $attrs.modelId;
        $scope.model_name = $attrs.modelName;

      };
      return {
        restrict:"E",
        link: linker,
        controller: 'CommentFormController',
        scope: true,
        templateUrl: wejs.getTemplateUrl('comment/views/commentForm.html')
      };
    }
  ]);

});
