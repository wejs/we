/**
 * Auth Module
 */
define('auth/auth',[
  'angular',
  'angular-resource'
], function (
  angular,
  ngResource
) {

  // --- MODULE ---
  var module = angular.module('auth', [
    'ngResource'
  ]);

  // -- CONSTANTS
  module.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  });

  return module;
});

// load module components like directives od controllers
requirejs([
  'auth/directives/loginFormDirective',
  'auth/directives/signupFormDirective',
  'auth/factories/SessionService',
  'auth/controllers/LoginController',
  'auth/controllers/CreateAccountController'
]);