'use strict';

angular.module('application.services')
  .factory('CommentResource',[
    '$resource',
    function($resource){
    return $resource('/comment/:id', {
      id: '@id'
    }, {});
  }

]);
