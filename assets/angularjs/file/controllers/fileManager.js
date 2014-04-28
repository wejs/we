(function() {

  define('file/controllers/fileManager',['angular', 'modules'], function (angular) {

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