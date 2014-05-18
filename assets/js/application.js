
/**
* The application file bootstraps the angular app by  initializing the main module and
* creating namespaces and moduled for controllers, filters, services, and directives.
*/

var dependencies = [
  'jquery',
  'app'
];

define('application', dependencies, function(
  jQuery,
  App
) {
  var application = {};


  require(['domReady!'], function (document) {


    we.bootstrap(function(){
      require(['emberApp'],function(){

      });
    });
  });

  return application;

});
