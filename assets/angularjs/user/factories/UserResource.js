/**
 * UserResource
 */
define('user/factories/UserResource',[
    'angular',
    'user/user'
  ], function (
    angular,
    userModule
  ) {
  userModule.factory("UserResource", [
    "$resource",
    function ($resource) {
      // We need to add an update method
      return $resource(
         "/users/:id", {
            id: "@id"
          }, {
            update: {
              method: 'PUT'
            }
          }
      );
    }
  ]);
});
