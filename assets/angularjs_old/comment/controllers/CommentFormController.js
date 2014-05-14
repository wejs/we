/**
 * CommentFormController
 */
define('comment/controllers/CommentFormController',[
    'angular',
    'comment/comment',
    'comment/factories/commentService'
  ], function (
    angular,
    module
  ) {

    module.controller("CommentFormController", [
      "$scope",
      "commentService",
    function($scope, commentService) {

      var startNewComment = function(){
        $scope.comment = {
          text : ''
        }
        $scope.showFormActions = false;
      }

      startNewComment();

      $scope.startWriting = function($event){
        $scope.showFormActions = true;
      }

      $scope.submit = function($event){

        $scope.comment.model_name = $scope.model_name;
        $scope.comment.model_id = $scope.model_id;

        var Comment = new commentService.resource($scope.comment);

        Comment.$save(function(data, headers) {

          $scope.$parent.comments.push(data.item);
          startNewComment();
          /*
          if(data.post){
            $scope.posts.unshift(data.post);
          }

          $scope.closeSharebox();
          jQuery('.sharebox textarea').val('');
          */

        }, function(err, headers) {
          // error here
          // TODO
          console.error('Error on comment save error: ',err);
        });

      }

      $scope.cancel = function($event){
        console.log($scope.comment);
        startNewComment();
      }
    }
  ]);
});
