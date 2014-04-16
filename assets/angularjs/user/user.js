
define([
  'angular',
  '$socket',
  'angular-resource',
  './directives/userMenuDirective',
  './directives/loginFormDirective'
], function (
  angular,
  $socket,
  ngResource
) {

  // --- MODULE ---
  angular.module('application.user', [
    'ngResource','ngRoute', 'ui.router', 'ui.bootstrap'
  ]).
  config([ '$locationProvider','$httpProvider','$stateProvider', '$urlRouterProvider',
    function( $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

      $stateProvider
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
      .state('user', {
        url: "/users/:id",
        views: {
          "": {
            templateUrl: "/angularjs/user/views/user.html",
            controller: 'UserItemController'
          }
        },
        resolve: {
          user: function(userShowResolver, $stateParams){
            return userShowResolver($stateParams);
          }
        }
      });
    }
  ]);

  // --- SERVICES ---
  angular.module("application.user")
  .service("UserService", [
    "UserResource",
    function( UserResource ){
      // users object to store users data
      var users = {};

      this.users = users;

      this.getUser = function(id){
        if(users[id]){
          return this.users[id];
        }else{
          users[id] = {};

          return users[id] = UserResource.get({
            id: id
          }, function(){
            return users[id];
          });
        }
      };

    }
  ]);

  // --- RESOURCES ---
  angular.module("application.user")
  .factory("UserResource", [
    "$resource",
    function ($resource) {
    // We need to add an update method
    return $resource(
       "/users/:id", {
          id: "@id"
        }, {
          update: {
            method: 'PUT'
          }
        }
    );
  }])
  .factory('userResolver',[
    '$http', '$q', 'UserResource',
    function($http,$q, UserResource){
      return function () {
        var deferred = $q.defer();

        var users;
        users = UserResource.query(function() {
          return deferred.resolve(users);
        }, function(error) {
          console.log('error on get users', error);
          return deferred.reject(error);
        });

        return deferred.promise;
      };
    }])
    .factory('userShowResolver',[
      '$rootScope',
      '$http',
      '$q',
      'UserResource',
      '$stateParams',
    function($rootScope, $http,$q, UserResource, $stateParams){
      return function ($stateParams) {
        var deferred = $q.defer();
        // get from cache
        if($rootScope.users && $rootScope.users[$stateParams.id]){
          return $rootScope.users[$stateParams.id];
        }else{
          UserResource.get({
            id: $stateParams.id
          }, function(user, getResponseHeaders){
            console.log('resolvids');
            return deferred.resolve(user);
          }, function(error) {
            return deferred.reject(error);
          });
        }

        return deferred.promise;
      };
  }]);

  angular.module("application.user")
  .factory('SessionService',[
    '$resource',
    '$rootScope',
    'UserService',
    function($resource, $rootScope, UserService){

    var service = $resource('/users/:param',{},{
      'login': {
        method: 'POST',
        url: '/users/login'
      },
      'logout': {
        method: 'DELETE',
        url: '/users/logout'
      },
      'getCurrent': {
        method: 'GET',
        url: '/users/current'
      }

    });

    var user = {};

    function getUser() {
      return $rootScope.user;
    }

    function getCurrentUser(callback) {
      service.getCurrent(
        function(res, status){
          if(res.user.id){
            $rootScope.user = res.user;
            $rootScope.user.authorized = true;

            if(callback)
              callback(user);
          }
        },
        function(err){
          console.log('sessionService.getCurrent error: ', err);
          //if(angular.isFunction(errorHandler)){
          //  errorHandler(err);
          //}
        }
      );

    }

    function authorized(){
      return $rootScope.user.authorized === true;
    }

    function unauthorized(){
      return $rootScope.user.authorized === false;
    }

    function login(newUser,resultHandler,errorHandler) {
      service.login(
        newUser,
        function(res, status){
          $rootScope.user = (res.user || {});
          //_user.authorized = res.authorized;
          $rootScope.user.authorized = true;
          if(angular.isFunction(resultHandler)) {
            resultHandler(res);
          }
        },
        function(err){
          if(angular.isFunction(errorHandler)){
            errorHandler(err);
          }
        }
      );
    }

    function logout(user,resultHandler,errorHandler){
      service.logout(
        user,
        function(res){
          user = (res.user || {});
          user.authorized = res.authorized;
          if(angular.isFunction(resultHandler)) {
            resultHandler(res);
          }
        },
        function(err){
          if(angular.isFunction(errorHandler)){
            errorHandler(err);
          }
        }
      );
    }

    getCurrentUser();

    return {
      user:user,
      login: login,
      logout: logout,
      authorized: authorized,
      getUser: getUser,
      getCurrentUser: getCurrentUser
    };
  }]);


  // --- CONTROLERS ---

  angular.module("application.user")
  .controller("CreateAccountCtrl", [
    "$scope",
    "$http",
    "$location",
    "$window",
    function($scope, $http, $location, $window ) {
      var errorHandler, init, loginHandler, logoutHandler;

      $scope.user = {};
      $scope.errors = {};
      $scope.messages = ['oi mundo','test'];

      $scope.submit = function(event) {
        event.preventDefault();
        event.stopPropagation();
        $http({
            method: 'POST',
            url: '/signup',
            data: {
              'name': $scope.user.name,
              'email': $scope.user.email,
              'password': $scope.user.password,
              'confirmPassword': $scope.user.confirmPassword
            }
          }).success(function(data, status, headers, cfg) {
            if(status == 201){
              // good, redirect
              if(typeof data.user !== 'undefined'){
                // logged without activation email
                $window.location.href = '/';
              }else {
                alert(data.responseMessage.success[0]);
                $scope.messages = data.responseMessage.success;
              }

            } else {
              console.log(data);
              console.log(status);
            }

          }).error(function(data, status, headers, cfg) {
            if(status == 400){
              $scope.messages = data.responseMessage.errors;
            } else {
              $scope.messages = data.responseMessage.errors;

              console.log(data);
              console.log(status);
            }

          });
      };
    }
  ]);

  angular.module("application.user")
  .controller("LoginCtrl", [
    "$rootScope",
    "$scope",
    "$location",
    "SessionService",
    "$window",
    function($rootScope, $scope, $location, SessionService, $window) {
      var errorHandler, init, loginHandler, logoutHandler;

      init = function() {
        $scope.templates = [ { name: 'login-form.html', url: 'templates/login-form.ejs'} ];
        $scope.template = $scope.templates[0];

        return $scope.user = {};
      };
      loginHandler = function(res) {
        if (SessionService.authorized(res)) {

          // TODO set a better message handler
          $scope.message = "Authorized!";
          // Login the user in application
          $rootScope.user = res;
          $rootScope.user.authorized = true;

        } else {
          return $scope.message = "Invalid username or password!";
        }
      };
      logoutHandler = function(res) {
        var user;
        $scope.message = "Logged Out!";
        user = {
          name: '',
          email: ''
        };

        // clear loggedin user vars
        $scope.user = user;
        $rootScope.user = user;

        console.log('no logoutHandler', res);

        // redirect to serverside logout
        return $location.path("/users/logout");

      };
      errorHandler = function(err) {
        return $scope.message = "Error! " + err;
      };
      $scope.login = function(event) {
        event.preventDefault();
        event.stopPropagation();

        return SessionService.login($scope.user, loginHandler, errorHandler);
      };
      $scope.logout = function() {
        return SessionService.logout($scope.user, logoutHandler, errorHandler);
      };

      $scope.showMessage = function() {
        return $scope.message && $scope.message.length;
      };
      return init();
    }
  ]);

  angular.module("application.user")
  .controller("UserController", [
    "$rootScope","$scope", "SessionService", "UserResource", "usersData", "$route", "$routeParams",
    function($rootScope, $scope, SessionService, UserResource, usersData, $route, $routeParams) {
      var init;
      var show;

      if(!$rootScope.users)
        $rootScope.users = {};

      init = function (){
        console.log('users',usersData);
        $scope.users = usersData;
        //$rootScope.activities = usersData;
      };

      show = function ($scope, $routeParams){
        console.log('no show');
        console.log('$routeParams', $routeParams);
      };

      $scope.dismiss = function() {
        console.log('no dismiss',$scope);
        $scope.$dismiss();
      };

      $scope.edit = function(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log($scope);
        return console.log('edit');
      };

      $scope["delete"] = function(index, event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('delete');
        console.log(new ActivityResource({
          'activity': $scope.activities[index]
        }));
        if (confirm('Permanently delete this post?')) {
          console.log($scope.activities[index]);
          $scope.activities[index].$delete();
          return $scope.activities.splice(index, 1);
        }
      };

      $scope.submit = function(event, activity) {
        event.preventDefault();
        event.stopPropagation();

        var Activity;

        Activity = new ActivityResource({
          'text': activity.content
        });

        Activity.$save(function(data, headers) {

          console.log('Activity.$save', data);
          if(data.activity){
            $scope.activities.unshift(data.activity);
          }

          $scope.closeSharebox();
          jQuery('.sharebox textarea').val('');

        }, function(err, headers) {
          // error here
          // TODO
          console.error('error: ',err);
        });

      };

      return init();

    }
  ])
  .controller("UserItemController", [
    "$rootScope","$scope", 'UserResource', 'user',
    function($rootScope, $scope, UserResource, user) {
      var show;
      console.log('oi');
      if(!$rootScope.users)
        $rootScope.users = {};

      if($rootScope.users[user.id]){
        $scope.user = $rootScope.users[user.id];
      } else {
        $rootScope.users[user.id] = user;
        $scope.user = user;
      }

      $scope.$watch('$rootScope.users[$scope.user]', function() {
        $scope.user = $rootScope.users[$scope.user.id];
        // do something here
        console.info('$rootScope.users[user.id]',$rootScope.users[$scope.user.id]);
      }, true);

      $scope.up = function() {
        return console.log('up');
      };

      $scope.down = function() {
        return console.log('down');
      };

      $scope.share = function() {
        return console.log('share');
      };

      $scope.edit = function(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log($scope);
        return console.log('edit');
      };

      $scope["delete"] = function(index, event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('delete');
        console.log(new UserResource({
          'user': $scope.users[index]
        }));
        if (confirm('Permanently delete this post?')) {
          console.log($scope.users[index]);
          $scope.users[index].$delete();
          return $scope.users.splice(index, 1);
        }
      };

      $scope.submit = function(event, activity) {
        event.preventDefault();
        event.stopPropagation();

        var user;

        Activity = new ActivityResource({
          'text': activity.content
        });

        Activity.$save(function(data, headers) {

          console.log('Activity.$save', data);
          if(data.activity){
            $scope.activities.unshift(data.activity);
          }

          $scope.closeSharebox();
          jQuery('.sharebox textarea').val('');

        }, function(err, headers) {
          // error here
          // TODO
          console.error('error: ',err);
        });
      };
    }
  ]);

});