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
      var users = {}
      this.users = users;

      /**
       * Get on user from server or from this service users
       * @param  {string}   id       User id to find
       * @param  {Function} callback function callback for return result
       * @return {[type]}            null
       */
      this.getUser = function(id, callback){
        if(users[id]){
          callback(null, users[id]);
        }else{
          users[id] = {};
          // TODO add a error handler in get user
          UserResource.get({
            id: id
          }, function(data){

            if(data.item && data.item.id){
              // cache this user
              users[id] = data.item;
              callback(null, users[id]);
            } else {
              callback(null, null);
            }

          });
        }
      };

    }
  ]);

});