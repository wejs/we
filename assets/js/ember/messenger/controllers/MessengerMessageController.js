
define(['we','ember'], function (we) {

  App.MessengerMessageController = Ember.ObjectController.extend({
    messageClass: function(){
      return 'message ' + this.get('model').status;
    }.property('model.status'),
    init: function(){
      this._super();
      var _this = this;
      var message = _this.get("model");

      if(message.status == 'sending'){
        we.messenger.sendMessage(message.content, message.toId,function(error,response){
          if(error){
            console.error(error);
          }

          setTimeout(function(){
            _this.set('model.status', 'salved');
          }, 3000);

          response.status = 'send';
          _this.set('model',response);

        });
      }
    }
  });

});