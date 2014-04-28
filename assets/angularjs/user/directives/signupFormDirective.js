/**
 * Signup Form directive
 */
define('user/directives/signupFormDirective',[
    'angular',
    'user/user'
  ], function (
    angular,
    userModule
  ) {

  userModule.directive('signupForm', [
    '$compile',
    function($compile) {

      return {
        templateUrl: wejs.getTemplateUrl('user/views/signup-form.html'),
        restrict:"EA"
      };
    }
  ]);
});
