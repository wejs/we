/**
 * Login form Directive
 */
define('auth/directives/weLoginButtomDirective',[
    'angular',
    'auth/auth',
    'auth/factories/SessionService'
  ], function (
    angular,
    authModule
  ) {

  authModule.directive('weLoginButtom', [
      '$rootScope', 'SessionService', 'AUTH_EVENTS','$modal',
    function($rootScope, SessionService, AUTH_EVENTS, $modal) {

      var linker = function($scope, $element, attrs) {
        $element.click(function(){
          $scope.modalLoginForm();
        });
        $scope.modalLoginForm = function () {
          var modalInstance = $modal.open({
            templateUrl: '/angularjs/auth/views/auth-login-form-modal.html',
              controller: 'LoginCtrl'
            // resolve: {
            //   items: function () {
            //     return $scope.items;
            //   }
            // }
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            console.info('Modal dismissed at: ' + new Date());
          });
        };


        var doAfterLogoutSuccess = function doAfterLogoutSuccess(){
          $element.show();
        };

        var doAfterLoginSuccess = function doAfterLoginSuccess(){
          $element.hide();
        };

        if( SessionService.authorized() ){
          doAfterLoginSuccess();
        }else {
          doAfterLogoutSuccess();
        }

        // Login Event
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, next) {
          doAfterLoginSuccess();
        });

        // logout Event
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, next) {
          doAfterLogoutSuccess();
        });

      };

      return {
        restrict:"EA",
        link: linker
      };
    }
  ]);
});
