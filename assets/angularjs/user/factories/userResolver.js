/**
 * userResolver
 */
define('user/factories/userResolver',[
    'angular',
    'user/user',
    'user/factories/UserResource'
  ], function (
    angular,
    userModule
  ) {

  userModule.factory('userResolver',[
    '$http', '$q', 'UserResource',
    function($http,$q, UserResource){
      return function () {
        var deferred = $q.defer();

        var users;
        users = UserResource.query(function() {
          return deferred.resolve(users);
        }, function(error) {
          console.log('error on get users', error);
          return deferred.reject(error);
        });

        return deferred.promise;
      };
    }
  ]);

});
