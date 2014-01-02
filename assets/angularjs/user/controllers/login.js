(function() {

  define([
    'angular',
    'user/services/session',
    'modules'
  ], function (
    angular,
    SessionService
  ) {

    return angular.module("application.user")
    .controller("LoginCtrl", [
      "$rootScope",
      "$scope",
      "$location",
      "SessionService",
      "$window",
      function($rootScope, $scope, $location, SessionService, $window) {
        var errorHandler, init, loginHandler, logoutHandler;

        init = function() {
          $scope.templates = [ { name: 'login-form.html', url: 'templates/login-form.ejs'} ]
          $scope.template = $scope.templates[0];

          return $scope.user = {};
        };
        loginHandler = function(res) {
          if (SessionService.authorized(res)) {
            $scope.message = "Authorized!";
            $rootScope.user = SessionService.getUser();
            $scope.user = SessionService.getUser();
            //return $location.path("/users");
            $window.location.reload();
          } else {
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
}());
