
define(['we','ember'], function (we) {

  App.UserController = Ember.ObjectController.extend({
    isEditing: false,
    defaultlanguages: [
      'pt-br',
      'en-us'
    ],
    activities: function() {
      var user = this.get('model');
      if(user && user.id){
        return this.store.find('post', { creator: user.id });
      }else{
        return [];
      }
    }.property('model.id'),
    actions: {
    }
  });

});
