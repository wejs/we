/**
 * Auth Module
 */
define('auth/auth',[
  'angular',
  'angular-resource'
], function (
  angular,
  $socket,
  ngResource
) {

  // --- MODULE ---
  var module = angular.module('auth', [
    'ngResource'
  ]);

  return module;
});

// load module components like directives od controllers
requirejs([
  'auth/factories/SessionService',
  'auth/controllers/LoginController',
  'auth/controllers/CreateAccountController'
]);