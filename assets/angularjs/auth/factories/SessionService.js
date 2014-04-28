/**
 * Session service
 */
define('auth/factories/SessionService',[
  'angular',
  'angular-resource',
  'auth/auth',
  'user/user',
  'user/factories/UserService'
], function (
  angular,
  ngResource,
  authModule,
  userModule
) {

  return authModule.factory('SessionService',[
    '$resource',
    '$rootScope',
    'UserService',
    'AUTH_EVENTS',
    '$state',
    '$location',
    function($resource, $rootScope, UserService, AUTH_EVENTS, $state, $location){

    var service = $resource('/users/:param',{},{
      'login': {
        method: 'POST',
        url: '/users/login'
      },
      'logout': {
        method: 'DELETE',
        url: '/users/logout'
      },
      'getCurrent': {
        method: 'GET',
        url: '/users/current'
      }

    });

    var factory = {}

    factory.user = {}


    factory.getUser = function () {
      return $rootScope.user;
    }

    factory.getCurrentUser = function(callback) {
      service.getCurrent(
        function(res, status){
          if(res.user.id){
            $rootScope.user = res.user;
            $rootScope.user.authorized = true;
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

            // if are in / redirect to dashboard page
            if($location.path() == '/' || $state.current.name == 'index'){
              $state.transitionTo('dashboard');
            }

            if(callback){
              callback(user);
            }
          }
        },
        function(err){
          console.error('sessionService.getCurrent error: ', err);
          //if(angular.isFunction(errorHandler)){
          //  errorHandler(err);
          //}
        }
      );

    }

    factory.authorized = function (){
      return $rootScope.user.authorized === true;
    }

    factory.unauthorized = function (){
      return $rootScope.user.authorized === false;
    }

    factory.login = function (newUser,resultHandler,errorHandler) {
      service.login(
        newUser,
        function(res, status){
          $rootScope.user = (res.user || {});
          //_user.authorized = res.authorized;
          $rootScope.user.authorized = true;
          if(angular.isFunction(resultHandler)) {
            resultHandler(res);
          }
        },
        function(err){
          if(angular.isFunction(errorHandler)){
            errorHandler(err);
          }
        }
      );
    }

    factory.logout = function (user,resultHandler,errorHandler){
      service.logout(
        user,
        function(res){
          user = (res.user || {});
          user.authorized = res.authorized;
          if(angular.isFunction(resultHandler)) {
            resultHandler(res);
          }
        },
        function(err){
          if(angular.isFunction(errorHandler)){
            errorHandler(err);
          }
        }
      );
    }

    factory.getCurrentUser();

    return factory;
  }]);
});