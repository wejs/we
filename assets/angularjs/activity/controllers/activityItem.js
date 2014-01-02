(function() {

  define(["angular", "modules"], function (angular) {

    return angular.module("application.activity")
    .controller("ActivityItemController", [
      "$rootScope","$scope", 'ActivityResource', 'activity', '$modalInstance',
      function($rootScope, $scope, ActivityResource, activity, $modalInstance) {
        var show;

        if(!$rootScope.activities)
          $rootScope.activities = {};

        if($rootScope.activities[activity.id]){
          $scope.activity = $rootScope.activities[activity.id];
        } else {
          $rootScope.activities[activity.id] = activity;
          $scope.activity = activity;
        }

        $scope.$watch('$rootScope.activities[$scope.activity]', function() {
          $scope.activity = $rootScope.activities[$scope.activity.id];
          // do something here
          console.info('$rootScope.activities[activity.id]',$rootScope.activities[$scope.activity.id]);
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
      }

    ]);

  });
}());