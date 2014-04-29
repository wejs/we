/**
 * commentDirective
 */
define('comment/directives/commentDirective',[
  'angular',
  'comment/comment'
  //'comment/controllers/CommentController'
], function (
  angular,
  module
) {

  module.directive('weComment', [
    '$compile',
    function($compile) {
      var linker = function($scope, $element, $attrs) {

      };
      return {
        restrict:"E",
        link: linker,
        //controller: 'CommentsController',
        scope: false,
        templateUrl: wejs.getTemplateUrl('comment/views/comment.html')
      };
    }
  ]);


  return {};
});


