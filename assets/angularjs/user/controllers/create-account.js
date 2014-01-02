(function() {

  define(['angular','modules'], function (angular) {
    "use strict";

    return angular.module("application.user")
    .controller("CreateAccountCtrl", [
      "$scope",
      "$http",
      "$location",
      "$window",
      function($scope, $http, $location, $window ) {
        var errorHandler, init, loginHandler, logoutHandler;

        $scope.user = {};
        $scope.errors = {};
        $scope.messages = ['oi mundo'];

        $scope.submit = function(event) {
          event.preventDefault();
          event.stopPropagation();
          $http({
              method: 'POST',
              url: '/signup',
              data: {
                'name': $scope.user.name,
                'email': $scope.user.email,
                'password': $scope.user.password,
                'confirmPassword': $scope.user.confirmPassword
              }
            }).success(function(data, status, headers, cfg) {
              if(status == 201){
                // good, redirect
                $window.location.href = '/';
              } else {
                console.log(data);
                console.log(status);
              }

            }).error(function(data, status, headers, cfg) {
              if(status == 400){
                $scope.messages = data.responseMessage.errors;
              } else {
                console.log(data);
                console.log(status);
              }
                              
            });
        };
      }
    ]);
  });
}());