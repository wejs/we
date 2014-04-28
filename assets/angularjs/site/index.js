// Load module files
(function() {

  var moduleFiles = [
    './controllers/navbar',
    './directives/weRegionDirective',
    './directives/weMenuDirective'
  ];

  define('site/index', moduleFiles, function() {} );

}());