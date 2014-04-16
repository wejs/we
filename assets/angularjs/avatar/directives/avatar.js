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
      function($compile, UserService) {
        return{
          restrict:"E",
          template: '<a href="{{avatarLink}}"> <img width="{{avatarWidth}}" height="{{avatarHeight}}" class="{{avatarClass}}" src="/imgs/avatars/user-avatar.png" data-ng-src="{{avatarImageUrl}}"/> </a>',
          scope: {
            userId: '=userId',
          },
          link: function (scope, elm, attrs) {
            var user = {};

            if(scope.userId){
              getUserAvatarId(scope.userId);
            }

            function getUserAvatarId(uid){

              user = UserService.getUser(scope.userId);
              user.$promise.then(function(){
                // if user has avatar
                if(user.avatarId){
                  scope.avatarId = user.avatarId;
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

              if ((scope.avatarId !== null) && (scope.avatarId !== undefined) && (scope.avatarId !== '')) {
                scope.avatarImageUrl = '/images/' + scope.avatarId;
              }
            }

            scope.$watch('avatarId', function (newId, oldId) {
              setVars(scope, newId);
            });


            scope.$watch('userId', function (newId, oldId) {
              if(newId){
                getUserAvatarId(newId);
              }
            });
          }

        };
      }
    ]);
  });
}());
