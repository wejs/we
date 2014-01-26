
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
    './messenger/index',
    './user/index',
    './site/index',
    './avatar/index',
    './activity/index',
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
      'application.activity',
      'application.filters',
      'application.services',
      'application.directives',
      'application.constants',
      'application.controllers',
      'application.user',
      'ui.router',
      'ui.bootstrap',
      //,'wu.masonry'
      'blueimp.fileupload'
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
            "": {
              templateUrl: "/angularjs/site/views/home.html"
            },
            "signup-form@index": {
              templateUrl: "/angularjs/user/views/signup-form.html"
            }
          }
        })

        // ---- USERS
        .state('forgot_password', {
          url: "/user/forgot_password",
          templateUrl: '/angularjs/user/views/forgotPasswordForm.html'
          //controller: 'LoginCtrl'
        })
        .state('logout', {
          url: "/users/logout",
          controller: function($scope,$window){
            return $window.location.href = "/users/logout";
          }
        })
        .state('signup', {
          url: "/signup",
          templateUrl: '/angularjs/user/views/signup.html',
          controller: 'LoginCtrl',
        })

        .state('users', {
          url: "/users",
          controller: 'UserController',
          views: {
            "": {
              templateUrl: "/angularjs/user/views/index.html",
              controller: 'UserController'
            }
          },
          resolve: {
            usersData: function(userResolver){
              console.log('resolvendo');
              return userResolver();
            }
          }
        })
        .state('users.user', {
          url: "/:id",
          onEnter: function($stateParams, $state, $modal, $resource, userShowResolver) {
            $modal.open({
              templateUrl: "/angularjs/user/views/user.html",
              controller: 'UserItemController',
              resolve: {
                user: function(userShowResolver){
                  return userShowResolver($stateParams);
                }
              }
            }).result.then(function(result) {
              console.info('no user then',result);
              return $state.transitionTo("users");
            }, function () {
              console.info('Modal dismissed at: ' + new Date());
              return $state.transitionTo("users");
            });
          }
        })


        // --- ACTIVITY
        .state('ActivityController', {
          url: "/activity",
          templateUrl: "/angularjs/activity/views/index.html",
          controller: 'ActivityController',
          resolve: {
            activitiesData: function(activityResolver){
              console.log('resolvendo');
              return activityResolver();
            }
          }
        })
        .state('ActivityController.activity', {
          url: "/:id",
          onEnter: function($stateParams, $state, $modal, $resource, activityShowResolver) {
            $modal.open({
              templateUrl: "/angularjs/activity/views/activity.html",
              controller: 'ActivityItemController',
              resolve: {
                activity: function(activityShowResolver){
                  return activityShowResolver($stateParams);
                }
              }
            }).result.then(function(result) {
              console.info('no activity then',result);
              return $state.transitionTo("ActivityController");
            }, function () {
              console.info('Modal dismissed at: ' + new Date());
              return $state.transitionTo("ActivityController");
            });
          }
        })
        .state('ActivityController.activity.edit', {
          url: "/edit",
          onEnter: function($stateParams, $state, $modal, $resource, activityShowResolver) {
            $modal.open({
              templateUrl: "/angularjs/activity/views/activity.html",
              controller: 'ActivityItemController',
              resolve: {
                activity: function(activityShowResolver){
                  return activityShowResolver($stateParams);
                }
              }
            }).result.then(function(result) {
              console.info('no activity edit then',result);
              return $state.transitionTo("ActivityController");
            }, function () {
              console.info('Modal edited dismissed at: ' + new Date());
              return $state.transitionTo("ActivityController");
            });
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

        $rootScope.user = {};
        $rootScope.user.authorized = false;
        $rootScope.user.loading = true;

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