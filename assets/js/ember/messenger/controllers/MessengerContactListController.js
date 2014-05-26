
define(['we','ember'], function (we) {

  App.MessengerContactListController = Ember.ArrayController.extend({
    contacts: [],
    openContacts: [],
    publicMessages: [],
    isListOpen: false,
    init: function initWeMessengerComponent(){
      this._super();

      var self = this;
      // get contact list on innit
      var store = this.get('store');

      console.warn('we messenger innit');
      // get contact list on innit
      we.messenger.getContactList(function(error,contactsList){
        if(error){
          console.error(error);
        }
        self.set('contacts',contactsList);
      });

      we.events.on('weMessengerSendPublicMessage',function weMessengerSendPublicMessage(event, messageObj){
        console.warn('we messenger send public message', messageObj);
        var store = self.get('store');

        // Create the new message
        var message = store.createRecord('messages', messageObj);

        // Save the new model
        message.save()
        .then(function(message){
          console.warn(message);

        }, function(error){
          console.warn('error',error);
        });

      });

    },
    didInsertElement: function didInsertElement() {
       if (!this.get('store')) {
          throw 'WeMessengerComponent requires store for autocomplete feature. Inject as store=store';
       }
    },
    actions: {
      openList: function openList(){
        this.set('isListOpen', true);
      },
      closeList: function closeList(){
        this.set('isListOpen', false);
      },
      startTalk: function startTalk(id){
        console.warn('start talk',id);
        //this.set('isListOpen', false);
        //
        this.getMessages(id);

      }
    },
    getMessages: function getMessages(id, callback){
      var store = this.get('store');

      store.find('messages', { uid: id })
      .then(function(messages){
        callback(null,messages);
      }, function(error){
        callback(error,null);
      });
    }

  });

});