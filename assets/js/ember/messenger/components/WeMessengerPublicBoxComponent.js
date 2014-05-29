
define(['we','ember'], function (we) {

  App.WeMessengerPublicBoxComponent = Ember.Component.extend({
    messages: [],
    messageNew: '',
    isListOpen: true,
    isVisible: false,

    init: function(){
      this._super();

      var self = this;

      we.messenger.getMessagesPublic(function(error, messages){
        if(error){
          console.error(error);
        }
        messages.reverse();
        self.set('messages',messages);
      });

      we.events.on('weMessengerNewPublicMessage', function(event, message){

         self.get('messages').pushObject(message);
      });

      // open and shown public box
      we.events.on('weMessengerOpenPublicBox', function(){
        if(!self.get('isVisible')){
          self.set('isVisible', true);
        }
        we.utils.scrollToBottom('#messengerBox-public', self);
      });

    },
    actions: {
      openList: function(){
        this.set('isVisible', true);
        we.utils.scrollToBottom('#messengerBox-public', self);
      }.observes('messages'),
      closeList: function(){
        this.set('isVisible', false);
      },
      toggleList: function(){
        if(this.get('isListOpen')){
          this.set('isListOpen', false);
        }else{
          this.set('isListOpen', true);
        }
        we.utils.scrollToBottom('#messengerBox-public', self);
      },
      sendMessage: function(){
        var self = this;

        var messageObj = {};
        messageObj.content = this.get('messageNew');
        messageObj.toId = null;

        //we.events.trigger('weMessengerSendPublicMessage', messageObj);

        // clear message input
        this.set('messageNew', '');

        we.messenger.sendPublicMessage(messageObj.content,function(error,response){
          if(error){
            console.error(error);
          }
          we.events.trigger('weMessengerNewPublicMessage', response);
        });

      }
    }
  });

});