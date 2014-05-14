/**
 * UserResource
 */
define('post/factories/PostResource',[
    'angular',
    'post/post'
  ], function (
    angular,
    module
  ) {

  module.factory('PostResource',[
    '$resource',
    function($resource){
      var PostResource;
      PostResource = $resource('/post/:id', {
        id: '@id'
      }, {
        'update': { method:'PUT' }
      });
      return PostResource;
    }
  ]);

});