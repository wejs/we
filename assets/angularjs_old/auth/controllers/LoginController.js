/**
 * LoginController
 */
define('auth/controllers/LoginController',[
  'angular',
  'angular-resource',
  'auth/factories/SessionService'
], function (
  angular,
  ngResource
) {

  angular.module("auth")
  .controller("LoginCtrl", [
    "$rootScope",
    "AUTH_EVENTS",
    "$scope",
    "$location",
    "SessionService",
    "$window",
    "$state",
    "$modalInstance",
    function($rootScope, AUTH_EVENTS,$scope, $location, SessionService, $window, $state, $modalInstance) {
      var errorHandler, init, loginHandler, logoutHandler;

      init = function() {
        return $scope.user = {};
      };
      loginHandler = function(res) {
        if (SessionService.authorized(res)) {
          // TODO set a better message handler
          $scope.message = "Authorized!";
          // Login the user in application
          $rootScope.user = res;
          $rootScope.user.authorized = true;

          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.closeModal();
          $state.go('dashboard');
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          return $scope.message = "Invalid username or password!";
        }
      };
      logoutHandler = function(res) {
        var user;
        $scope.message = "Logged Out!";
        user = {
          name: '',
          email: ''
        };

        // clear loggedin user vars
        $scope.user = user;
        $rootScope.user = user;

        console.log('no logoutHandler', res);

        // redirect to serverside logout
        return $location.path("/auth/logout");

      };
      errorHandler = function(err) {
        return $scope.message = "Error! " + err;
      };
      $scope.login = function loginFunc(event) {
        event.preventDefault();
        event.stopPropagation();

        return SessionService.login($scope.user, loginHandler, errorHandler);
      };
      $scope.logout = function logoutFunc() {
        return SessionService.logout($scope.user, logoutHandler, errorHandler);
      };

      $scope.showMessage = function showMessageFunc() {
        return $scope.message && $scope.message.length;
      };

      // -- modal features
      $scope.closeModal = function closeModalFunc(){
        if($modalInstance){
          $modalInstance.close();
        }
      };


      return init();
    }
  ]);

});