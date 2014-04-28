
define('comment/comment', [
  'angular'
], function (
  angular
) {
  // A simple directive to display a avatar image with user id
  var module = angular.module('comment',[
    'ngResource','ngRoute', 'ui.router'
  ]);

  // --- RESOURCES ---
  angular.module("comment")
  .factory("CommentResource", [
    "$resource",
    function ($resource) {
    // We need to add an update method
    return $resource(
       "/comment/:id", {
          id: "@id"
        }, {
          update: {
            method: 'PUT'
          }
        }
    );
  }]);

  // --- CONTROLLERS ---

  // define this module load module components like directives
  requirejs([
    'comment/directives/commentDirective',
    'comment/directives/commentsDirective'
  ]);

  return module;

});

