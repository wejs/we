define(['we','ember'], function (we) {
  App.MessengerContactController = Ember.ObjectController.extend({
    contactClass: function(){
      return 'contact ' + this.get('model').messengerStatus;
    }.property('model.messengerStatus'),
    init: function(){
      this._super();
      var _this = this;
    }
  });

});