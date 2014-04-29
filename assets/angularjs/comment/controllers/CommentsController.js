/**
 * CommentController
 */
define('comment/controllers/CommentsController',[
    'angular',
    'comment/comment',
    'comment/factories/commentService'
  ], function (
    angular,
    module
  ) {

    module.controller("CommentsController", [
      "$scope",
      "commentService",
    function($scope, commentService) {

    }
  ]);
});
