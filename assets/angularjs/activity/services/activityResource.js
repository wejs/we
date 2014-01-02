 (function() {

  define(['angular', "modules"], function (angular) {
    'use strict';

    return angular.module('application.activity')
      .factory('ActivityResource',[
        '$resource',
        function($resource){

        var ActivityResource;
        ActivityResource = $resource('/activity/:id', {
          id: '@id'
        }, {});
        return ActivityResource;
      }

    ]);

  });
}());