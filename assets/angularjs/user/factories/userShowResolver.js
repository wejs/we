/**
 * userShowResolver
 */
define('user/factories/userShowResolver',[
    'angular',
    'user/user',
    'user/factories/UserResource'
  ], function (
    angular,
    userModule
  ) {

  userModule.factory('userShowResolver',[
      '$rootScope',
      '$http',
      '$q',
      'UserResource',
      '$stateParams',
    function($rootScope, $http,$q, UserResource, $stateParams){
      return function ($stateParams) {
        var deferred = $q.defer();
        // get from cache
        if($rootScope.users && $rootScope.users[$stateParams.id]){
          return $rootScope.users[$stateParams.id];
        }else{
          UserResource.get({
            id: $stateParams.id
          }, function(user, getResponseHeaders){
            console.log('resolvids');
            return deferred.resolve(user);
          }, function(error) {
            return deferred.reject(error);
          });
        }

        return deferred.promise;
      };
    }
  ]);
});
