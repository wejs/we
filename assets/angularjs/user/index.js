// Load module files
(function() {

  var moduleFiles = [
    'modules',
    './services/session',
    './services/userResources',
    './controllers/login',
    './controllers/userController',
    './controllers/create-account'
  ];

  define( moduleFiles, function() {} );

}());