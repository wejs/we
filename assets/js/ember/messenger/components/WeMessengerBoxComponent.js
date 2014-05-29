
define(['we','ember'], function (we) {
  App.WeMessengerBoxComponent = Ember.Component.extend({
    messageNew: '',
    contact: {},
    messages: [],
    isListOpen: 'show', // show | close
    //flags
    isVisible: true,
    isWriting: false,
    // placeholder for message input
    messagePlaceholder: '',
    boxId: function(){
      return 'messengerBox-'+ this.get('contact.id');
    }.property('contact.id'),
    init: function(){
      this._super();
      var _this = this;
      var contact = _this.get('contact');

      if(contact.id){
        we.messenger.getMessagesWithUser(contact.id ,function(error, messages){
          if(error){
            console.error(error);
          }
          messages.reverse();
          _this.set('messages',messages);
          we.utils.scrollToBottom('.messages', _this);
        });
      }

      _this.pushNewMessage = function pushNewMessage(event, message){
        if( _this.get('contact.id') == message.fromId){
          _this.get('messages').pushObject(message);
        }
      };

      we.events.on('we-messenger-message-received', _this.pushNewMessage);

    },
    willDestroyElement: function(){
      we.events.off('we-messenger-message-received', this.pushNewMessage);
    },
    actions: {
      openList: function(){
        this.set('isVisible', 'show');
        we.utils.scrollToBottom('.messages', this);
      }.observes('messages'),
      closeList: function(){
        we.events.trigger('weMessengerCloseContactBox', this.get('contact'));
      },
      toggleList: function(){
        if(this.get('isListOpen') == 'hide'){
          this.set('isListOpen', 'show');
        }else{
          this.set('isListOpen', 'hide');
        }
        we.utils.scrollToBottom('.messages', this);
      },
      sendMessage: function(){
        // if is empty messageNew ...
        if( !this.get('messageNew') ){
          return;
        }

        var message = {
          content: this.get('messageNew'),
          toId: [
            this.get('contact').id
          ],
          fromId: we.authenticatedUser.id,
          createdAt: new Date(),
          status: 'sending'
        };
        // clear message input
        this.set('messageNew', '');
        //push to messages list and let message contoller handle the submit
        this.get('messages').pushObject(message);

      }
    }
  });

});