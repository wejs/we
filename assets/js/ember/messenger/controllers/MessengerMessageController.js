
define(['we','ember'], function (we) {

  App.MessengerMessageController = Ember.ObjectController.extend({
    init: function(){
      this._super();

      var d = $('#messengerBox-public');
      d.scrollTop(d.prop("scrollHeight"));
    }
  });

});