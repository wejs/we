
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
      edit: function edit(){
        this.set('isEditing', true);
      },
      cancel: function edit(){
        this.set('isEditing', false);
      },
      save: function save(){
        var _this = this;
        // save the model
        _this.get('model').save().then(function(){
          // updated!
          _this.set('isEditing', false);
        });
      },
      remove: function remove(){
        this.set('isEditing', false);
      }
    }
  });

});
