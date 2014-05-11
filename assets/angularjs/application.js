
/**
* The application file bootstraps the angular app by  initializing the main module and
* creating namespaces and moduled for controllers, filters, services, and directives.
*/

  var dependencies = [
    'jquery',
    'app',
    'angular',
    'angular-route',
    'modules',
    'angular-resource',
    'angular-cookies',
    'ng-table',
    'angular-ui-router',
    'angular-bootstrap',
    'ng-file-upload',
    'angular-formly',
    //'wuMasonry',
    'angular-route',
    'angular-moment',
    'user/user',
    'we-messenger',
    'post/post',
    'news/news',
    './site/index',
    './avatar/index',
    './file/index',
    'admin/admin',
    'auth/auth'
  ];

  define('application', dependencies, function(
    jQuery,
    App,
    angular,
    angularRoute,
    activity,
    modules,
    ngResource,
    ngCookies,
    ngTable,
    uiRouter,
    uiBootstrap
  ) {

    var app = angular.module('application', [
      'ngResource',
      'ngRoute',
      'ngTable',
      'angularFileUpload',
      'application.filters',
      'application.services',
      'application.directives',
      'application.constants',
      'application.controllers',
      'application.user',
      'we-messenger',
      'post',
      'news',
      'ui.router',
      'ui.bootstrap',
      'angularMoment',
      'admin',
      'formly',
      'auth'
    ]).
    config([ '$locationProvider','$httpProvider','$stateProvider', '$urlRouterProvider',  '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
      function( $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

        // salve references to angular provider for lazy load resources
        app.plugController = $controllerProvider.register;
        app.plugDirective = $compileProvider.directive;
        //app.routeProvider      = $routeProvider;
        app.filterProvider     = $filterProvider;
        app.provide            = $provide;

        // get csrf token //
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';

        $locationProvider.html5Mode(true).hashPrefix('#');

        // 404 handler
        $urlRouterProvider.otherwise("/404");

        $stateProvider
        .state('index', {
          url: "/",
          authenticate: false,
          views: {
            "highlighted": {
              templateUrl:  wejs.getTemplateUrl("site/views/highlighted.html")
            }
          }
        })
        .state('dashboard', {
          url: "/dashboard",
          authenticate: true,
          views: {
            "": {
              templateUrl:  wejs.getTemplateUrl("site/views/home.html")
            }
          }
        })
        .state('404', {
          url: "/404",
          templateUrl:  wejs.getTemplateUrl('site/views/error404.html')
        });

      }]).run([
      '$rootScope',
      '$route',
      '$http',
      '$window',
      '$state',
      'SessionService',
      function($rootScope, $route, $http, $window, $state, SessionService){

        $window.moment.lang(wejs.config.locale);

        $rootScope.user = {};
        $rootScope.user.authorized = false;
        $rootScope.user.loading = true;

        // Bind the `$routeChangeSuccess` event on the rootScope, so that we dont need to bind in individual controllers.
        $rootScope.$on('$routeChangeSuccess', function(currentRoute, previousRoute) {
          // This will set the custom property that we have defined while configuring the routes.

          if($route.current.action == "logoutHandler"){
            return $window.location.href = "/users/logout";
          }

          if($route.current.action && $route.current.action.length > 0){
            $rootScope.action = $route.current.action;
          }
        });

        // state chage envent
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
          if(toState.name == 'index'){
            console.log(SessionService.authorized());
            console.log($rootScope.user);
            if(SessionService.authorized()){
              if(fromState.name != 'dashboard'){
                $state.transitionTo('dashboard');
              }
              return event.preventDefault();
            }else{

            }
          }
        });

    }]);

    require(['domReady!'], function (document) {


      we.bootstrap(function(){
        angular.bootstrap(document, ['application']);
      });
      /*
      we.getAuthenticatedUser(function(err, user){

        we.io.connect();
        we.notify('Connected!', 'Connected to wejs.org server');

        angular.bootstrap(document, ['application']);

      });
      */
    });

    return app;
  });
