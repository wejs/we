(function() {

  define([
    'angular',
    'modules',
    'angular-resource'
  ], function (
    angular,
    modules,
    ngResource
  ) {

    "use strict";

    return angular.module("application.user")
      .factory('SessionService',[
        '$resource',
        function($resource){

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

        var user = {};

        function getUser() {
          if(!user){

          }

          return user;
        }

        function getCurrentUser(callback) {
          service.getCurrent(
            function(res, status){
              if(res.user){
                user = res.user;
                user.authorized = true;

                if(callback)
                  callback(user);
              }
            },
            function(err){
              console.log('sessionService.getCurrent error: ', err);
              //if(angular.isFunction(errorHandler)){
              //  errorHandler(err);
              //}
            }
          );

        }

        function authorized(){
          console.log(user);
          return user.authorized === true;
        }

        function unauthorized(){
          return user.authorized === false;
        }

        function login(newUser,resultHandler,errorHandler) {
          service.login(
            newUser,
            function(res, status){
              user = (res.user || {});
              //_user.authorized = res.authorized;
              user.authorized = true;
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

        function logout(user,resultHandler,errorHandler){
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

        getCurrentUser();

        return {
          user:user,
          login: login,
          logout: logout,
          authorized: authorized,
          getUser: getUser,
          getCurrentUser: getCurrentUser
        };

      }]);
  });
}());
