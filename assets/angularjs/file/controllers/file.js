(function() {

  define(['angular', 'modules', 'jquery.fileupload-angular'], function (angular, Application) {

    var isOnGitHub = window.location.hostname === 'blueimp.github.io',
        url = 'files/';

    return angular.module("application.controllers")
    .controller("DemoFileUploadController", [
      "$rootScope",
      "$scope",
      "$socket",
      "$location",
      "SessionService",
      "$http",
      "$filter",
      function($rootScope, $scope,$socket, $location, SessionService, $http, $filter) {
        $scope.options = {
            url: url,
            headers: {
              "X-CSRF-Token": $('meta[name=csrf-token]').attr('content')
            }
        };
        if (!isOnGitHub) {
          $scope.loadingFiles = true;
          $http.get(url)
            .then(
              function (response) {
                $scope.loadingFiles = false;
                $scope.queue = response.data.files || [];
              },
              function () {
                $scope.loadingFiles = false;
              }
            );
        }
      }
    ])
    .controller("FileDestroyController", [
      '$scope', '$http',
      function ($scope, $http) {
        var file = $scope.file,
          state;
        if (file.url) {
          file.$state = function () {
           return state;
          };
          file.$destroy = function () {
            state = 'pending';
            return $http({
              url: file.deleteUrl,
              method: file.deleteType
            }).then(
              function () {
                state = 'resolved';
                $scope.clear(file);
              },
             function () {
                state = 'rejected';
              }
            );
          };
        } else if (!file.$cancel && !file._index) {
          file.$cancel = function () {
            $scope.clear(file);
          };
        }
      }
    ]);
  });
}());