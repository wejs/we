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
              if(status = 200){
                // good, redirect
                $window.location.href = '/dashboard';
              } else {
                console.log(data);
                $scope.errors.push(data.error);
                // error
              }
              console.log(data);
              console.log(status);

            }).error(function(data, status, headers, cfg) {
              console.log(data);
              console.log(status);
            });
        };
      }
    ]);
  });
}());