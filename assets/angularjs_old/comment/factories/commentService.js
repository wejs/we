/**
 * commentService
 */
define('comment/factories/commentService',[
    'angular',
    'comment/comment',
    'angular-resource'
  ], function (
    angular,
    module
  ) {

  module.factory("commentService", [
    "$resource",
    function ($resource) {

      var service = {};

      service.resource = $resource(
       "/comment/:id", {
          id: "@id"
        }, {
          update: {
            method: 'PUT'
          }
        }
      );

      return service;
    }
  ]);

});