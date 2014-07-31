
define(['we','ember'], function (we) {
  App.GroupIndexController = Ember.ObjectController.extend({
    actions:{
      createPost: function(){
        console.warn('create');
      }
    }
  });
});