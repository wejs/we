// Load module files
(function() {

  var moduleFiles = [
    'modules',
    './controllers/file',
    './controllers/fileManager'
  ];

  define('file/index', moduleFiles, function() {} );

}());