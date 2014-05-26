
define(['we','ember'], function (we) {

  App.MessengerContactView = Ember.View.extend({
    templateName: 'messenger/message',
    attributeBindings: ['message'],
    didInsertElement: function didInsertElement() {
      // scroll box to bottom and show new items
      var box = this.$().parent();
      if(box){
        box.scrollTop(box.prop("scrollHeight"));
      }
    }
  });
});