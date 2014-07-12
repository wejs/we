
define(['we','ember'], function (we) {

  App.GroupIndexController = Ember.ObjectController.extend({
    postNew: {
      body: ''
    },
    actions:{
      createPost: function(){
        console.warn('create');
      }
    }
  });

});