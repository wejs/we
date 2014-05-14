(function() {
  define('avatar/controllers/avatar',['angular'], function (angular) {

    return angular.module("application.controllers").controller("AvatarController", [
      "$rootScope","$scope", '$upload', '$window', "$location", "SessionService", "$modal", "$modalInstance",
      function($rootScope, $scope, $upload, $window, $location, SessionService, $modal, $modalInstance) {

        $scope.modalClose = function (){
          $modalInstance.close();
        }

        $scope.files = [];

        // file progress
        $scope.max = 100;
        $scope.showWarning = false;
        $scope.dynamic = 0;
        $scope.type = 'info';
        $scope.progressActive  = false;

        $scope.avatar = {};

        // file upload
        $scope.onFileSelect = function($files) {
          $scope.files = $files;
        };

        $scope.submit = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          if($scope.files){
            for (var i = 0; i < $scope.files.length; i++) {
              var file = $scope.files[i];

              $scope.progressActive = 'active';

              $scope.upload = $upload.upload({
                url: '/user/avatar', //upload.php script, node.js route, or servlet url
                method: 'POST',
                // headers: {'header-key': 'header-value'},
                // withCredentials: true,
                data: {},
                file: file, // or list of files: $files for html5 only
              }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));

                if(evt.loaded){
                  $scope.dynamic = evt.loaded;
                }else{
                  $scope.dynamic = $scope.dynamic+1;
                }

              }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                $scope.avatar = data.avatar;

                $rootScope.$broadcast('user-avatar-change', data.user.id, data.avatar.id);

                $scope.progressActive = false;
                $scope.type = 'success';
              })
              .error(function(data){
                console.erro('Error on upload avatar',data);
                $scope.progressActive = false;
                $scope.type = 'error';
              });
              //.then(success, error, progress);
              //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
            }
          }

        }

      }

    ]);

  });
}());