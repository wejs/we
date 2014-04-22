(function() {

  define([
    'angular'
  ], function (
    angular
  ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('avatar', [
      '$compile',
      'UserService',
      '$rootScope',
      function($compile, UserService, $rootScope) {
        return{
          restrict:"E",
          template: '<a href="{{avatarLink}}"> <img width="{{avatarWidth}}" height="{{avatarHeight}}" class="{{avatarClass}}" src="/imgs/avatars/user-avatar.png" data-ng-src="{{avatarImageUrl}}"/> </a>',
          link: function (scope, elm, attrs) {
            var user = {};

            // forst try get user avatar from scope
            if(scope.avatarId){
              scope.avatarLink = '/users/' + user.id;
              setVars(scope, scope.avatarId);
            }else if(attrs.userId){
              getUserAvatarId(attrs.userId);
            }

            function getUserAvatarId(uid){
              user = UserService.getUser(uid);
              user.$promise.then(function(){
                // if user has avatar
                if(user.avatarId){
                  scope.avatarId = user.avatarId;
                  setVars(scope, scope.avatarId);
                }
                scope.avatarLink = '/users/' + user.id;
              });

            }

            function setVars(scope, newId){

              switch(attrs['avatarSize']) {
                case 'medium':
                  scope.avatarWidth = '200px';
                  scope.avatarHeight = '200px';
                  scope.avatarClass = 'img-rounded avatar-medium';
                  break;
                default:
                  scope.avatarWidth = '50px';
                  scope.avatarHeight = '50px';
                  scope.avatarClass = 'img-rounded avatar-small';
              }
              scope.avatarImageUrl = '/images/' + newId;
            }

            $rootScope.$on('user-avatar-change', function (event, userId, newAvatarId) {
              if(attrs.userId && (userId == attrs.userId) ){
                setVars(scope, newAvatarId);
              }
            });

            attrs.$observe('userId', function (newId) {
              if(newId) getUserAvatarId(newId);
            });
          }

        };
      }
    ]);
  });
}());
