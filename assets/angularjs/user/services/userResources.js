(function() {

  define([
    'angular',
    'modules',
    'user/services/session',
    'messenger/services/messenger',
    '$socket',

  ], function (
    angular,
    module,
    sessionService,
    messengerService,
    $socket
  ) {

    "use strict";

    return angular.module("application.user")
    .service("userService", ["$resource"])
    .factory("UserResource", [
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
    }])
    .factory('userResolver',[
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
      }])
      .factory('userShowResolver',[
        '$rootScope',
        '$http',
        '$q',
        'UserResource',
      function($rootScope, $http,$q, UserResource){
        return function ($stateParams) {
          var deferred = $q.defer();

          // get from cache
          if($rootScope.users && $rootScope.users[$stateParams.id]){
            return $rootScope.users[$stateParams.id];
          }else{
            UserResource.get({
              id: $stateParams.id
            }, function(user, getResponseHeaders){
              return deferred.resolve(user);
            }, function(error) {
              return deferred.reject(error);
            });
          }

          return deferred.promise;
        };
    }]);
  });
}());