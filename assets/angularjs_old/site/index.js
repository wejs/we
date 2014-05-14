// Load module files
(function() {

  var moduleFiles = [
    './controllers/navbar',
    './directives/weRegionDirective',
    './directives/weMenuDirective',
    'site/filters/i18nFilter'
  ];

  define('site/index', moduleFiles, function() {} );

}());