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
    function($rootScope, AUTH_EVENTS,$scope, $location, SessionService, $window, $state) {
      var errorHandler, init, loginHandler, logoutHandler;

      init = function() {
        $scope.templates = [ { name: 'login-form.html', url: 'templates/login-form.ejs'} ];
        $scope.template = $scope.templates[0];

        return $scope.user = {};
      };
      loginHandler = function(res) {
        if (SessionService.authorized(res)) {

          // TODO set a better message handler
          $scope.message = "Authorized!";
          // Login the user in application
          $rootScope.user = res;
          $rootScope.user.authorized = true;
          $state.go('dashboard');

          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
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
        return $location.path("/users/logout");

      };
      errorHandler = function(err) {
        return $scope.message = "Error! " + err;
      };
      $scope.login = function(event) {
        event.preventDefault();
        event.stopPropagation();

        return SessionService.login($scope.user, loginHandler, errorHandler);
      };
      $scope.logout = function() {
        return SessionService.logout($scope.user, logoutHandler, errorHandler);
      };

      $scope.showMessage = function() {
        return $scope.message && $scope.message.length;
      };
      return init();
    }
  ]);

});