

define(['we','ember'], function (we) {

 App.PostController = Ember.ObjectController.extend({
    isEditing: false,
    actions: {
      edit: function() {
        this.set('isEditing', true);
      },
      cancel: function() {
        this.set('isEditing', false);
      },
      save: function(){
        var _this = this;
        var model = _this.get('model');
        // save the model
        _this.get('model').save().then(function(post){
          // updated!
          _this.set('isEditing', false);
        });
      },
      deleteItem: function(){
        var userConfirmation = confirm( we.i18n("Are you sure you want to delete the post?") );
        if (userConfirmation === true) {
          var model = this.get('model');
          model.deleteRecord();
          model.save();
        }
      }
    }
  });

});
