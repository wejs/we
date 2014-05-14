/**
 * Signup Form directive
 */
define('auth/directives/signupFormDirective',[
    'angular',
    'auth/auth'
  ], function (
    angular,
    authModule
  ) {

  authModule.directive('signupForm', [
    '$compile',
    function($compile) {

      return {
        templateUrl: wejs.getTemplateUrl('auth/views/signup-form.html'),
        restrict:"EA"
      };
    }
  ]);
});
