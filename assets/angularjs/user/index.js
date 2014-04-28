// Load module files
(function() {

  var moduleFiles = [
    'modules',
    './directives/userMenuDirective',
    './directives/loginFormDirective',
  ];

  define('user/index', moduleFiles, function() {} );

}());