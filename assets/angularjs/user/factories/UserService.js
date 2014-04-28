/**
 * User Service
 */
define('user/factories/UserService',[
  'angular',
  'angular-resource',
  'user/user',
  'user/factories/UserResource'
], function (
  angular,
  ngResource,
  userModule
) {

  userModule.service("UserService", [
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

});