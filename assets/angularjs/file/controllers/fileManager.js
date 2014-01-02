(function() {

  define(['angular', 'modules', 'jquery.fileupload-angular'], function (angular) {

    "use strict";

    angular.module("application.controllers")
    .controller("FileManagerController", [
      "$rootScope",
      "$scope",
      "$socket",
      "$location",
      "SessionService",
      "$http",
      function($rootScope, $scope,$socket, $location, SessionService, $http) {


      }
    ]);
  });
}());