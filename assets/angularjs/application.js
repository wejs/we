
/**
* The application file bootstraps the angular app by  initializing the main module and
* creating namespaces and moduled for controllers, filters, services, and directives.
*/

(function() {
  "use strict";

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
    //'wuMasonry',
    'jquery.fileupload-angular',
    'angular-route',
    'angular-moment',
    'user/user',
    'we-messenger',
    'post/post',
    './site/index',
    './avatar/index',
    './post/index',
    './file/index'
  ];

  define( dependencies, function(
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
    uiBootstrap,
    //,wuMasonry
    jqueryFileuploadAngular
  ) {

    var app = angular.module('application', [
      'ngResource',
      'ngRoute',
      'ngTable',
      'application.filters',
      'application.services',
      'application.directives',
      'application.constants',
      'application.controllers',
      'application.user',
      'we-messenger',
      'post',
      'ui.router',
      'ui.bootstrap',
      //,'wu.masonry'
      'blueimp.fileupload',
      'angularMoment'
    ]).
    config([ '$locationProvider','$httpProvider','$stateProvider', '$urlRouterProvider',
      function( $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        $httpProvider.defaults.headers.common['Accept'] = 'application/json';

        $locationProvider.html5Mode(true).hashPrefix('#');

        // 404 handler
        $urlRouterProvider.otherwise("/404");

        $stateProvider
        .state('index', {
          url: "/",
          views: {
            "highlighted": {
              templateUrl: "/angularjs/site/views/highlighted.html",
              controller: function($scope, $rootScope){
                $scope.aboutShow = false;
                $rootScope.$watch('user.authorized', function () {
                  if($rootScope.user.authorized){
                    $scope.aboutShow = false;
                  }else{
                    $scope.aboutShow = true;
                  }
                });
              }
            },
            "": {
              templateUrl: "/angularjs/site/views/home.html"
            },
            "signup-form@index": {
              templateUrl: "/angularjs/user/views/signup-form.html"
            },

          }
        })

        // -- ADMIN
        .state('admin', {
          url: "/admin",
          views: {
            "": {
              templateUrl: "/angularjs/admin/views/roles.html"
            },
            "sidebar": {
              templateUrl: "/angularjs/site/views/sidebar.html"
            }
          },

        })
        .state('admin.roles', {
          url: "/roles",
          views: {
            "": {
              templateUrl: "/angularjs/admin/views/roles.html"
            },
            "sidebar": {
              templateUrl: "/angularjs/site/views/sidebar.html"
            }
          },
          controller: function(){
            console.log('no admin.roles');
          }
        })
        .state('404', {
          url: "/404",
          templateUrl: '/angularjs/site/views/error404.html'
          // redirectTo: '/login'
        });

      }]).run([
        '$rootScope',
        '$route',
        '$http',
        '$window',
        function($rootScope, $route, $http, $window){

        $window.moment.lang('en');

        $rootScope.theme = {};
        $rootScope.theme.url = '/bower_components/we-theme-bootstrap';
        $rootScope.theme.templateUrl = '/bower_components/we-theme-bootstrap/templates';

        $rootScope.user = {};
        $rootScope.user.authorized = false;
        $rootScope.user.loading = true;
        /*
        $http({method: 'GET', url: '/users/current'}).
          success(function(data, status, headers, config) {
            if(data.user.id){
              $rootScope.user = data.user;
              $rootScope.user.loading = false;
              $rootScope.user.authorized = true;
            }

          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        */
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
    }]);
/*
    app.init = function () {
      angular.bootstrap(document, ['application']);
    };
*/
    return app;
  });
}());