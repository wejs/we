(function() {
  define([
    'angular',
    'modules',
    'user/services/userResources',
    'io',
    'sails.io'
  ], function (
    angular,
    modules,
    UserService,
    io
  ) {

    return angular.module('application.services')
    .factory("$socket", [
      "$rootScope", "UserResource", function($rootScope, User) {
        var $socket;
        if( !$rootScope.connectedUsers ){
          $rootScope.connectedUsers = [];
        }

        $socket = io.connect();

        $socket.on("connect", function(stream) {
          console.log("someone connected!");

              // Listen for Comet messages from Sails
          $socket.on('message', function messageReceived(message) {

            ///////////////////////////////////////////////////////////
            // Replace the following with your own custom logic
            // to run when a new message arrives from the Sails.js
            // server.
            ///////////////////////////////////////////////////////////
            console.log('New comet message received :: ', message);
            //////////////////////////////////////////////////////

          });


    /*
          $socket.post('/messages',{message: 'sou foda'}, function (response) {
            console.log(response);
            console.log('post socket io');
            // create a new user
          });
    */
    /*
          var t=setTimeout(function(){
            $socket.post('/messages',{message: 'sou foda'}, function (response) {
              console.log(response);
              console.log('post socket io');
              // create a new user
            });
          },3000);
    */
    /*
          $socket.get('/messenger/test', function (response) {
            console.log(response);
            console.log('starting messenger socket io');

          });
    */
          /*
          $socket.post('/user',{name: 'foo'}, function (response) {
            // create a new user
          });
          $socket.put('/user/1',{name: 'foobar'}, function (response) {
            // update the user
          });
          $socket.delete('/user/1', function (response) {
            // delete the user
          });
    */
          return $socket.on("onUserDeleted", function(user) {
            var scope;
            scope = UsersController.getScope();
            console.log("onUserDeleted called", user);
            return scope.$apply(function() {
              return scope.users = $.grep(scope.users, function(o, i) {
                return o.id === user.id;
              }, true);
            });
          });
        });

        $socket.on("disconnect", function(stream) {
          return console.log("someone disconnected");
        });

        $socket.removeListener("connect");
        $socket.removeListener("news");
        $socket.removeListener("onUserAdded");
        return $socket.removeListener("onUserDeleted");

      }
    ]);
  });
}());
