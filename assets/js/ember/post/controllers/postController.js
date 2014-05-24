

define(['we','ember'], function (we) {

 App.postController = Ember.ObjectController.extend({
    isEditing: false,

    edit: function() {
      this.set('isEditing', true);
    },

    doneEditing: function() {
      this.set('isEditing', false);
      this.get('store').commit();
    }
  });

});
