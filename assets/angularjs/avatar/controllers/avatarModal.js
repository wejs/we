(function() {

  define(['angular'], function (angular ) {

    return angular.module("application.controllers").controller("AvatarModalController", [
      "$rootScope","$scope", "$modal",
      function($rootScope, $scope, $modal) {

        $scope.openModal = function () {
          var modalInstance = $modal.open({
            templateUrl: '/app/avatar/views/change-avatar-form.html',
            controller: 'AvatarController',
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            console.info('Modal dismissed at: ' + new Date());
          });
        };
      }
    ]);
  });
}());