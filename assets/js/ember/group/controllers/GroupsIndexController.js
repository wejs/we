
define(['we','ember'], function (we) {

  App.GroupsIndexController = Ember.ArrayController.extend({
    actions:{
      createGroup: function(){
        console.warn('create group');
      }
    }
  });

});