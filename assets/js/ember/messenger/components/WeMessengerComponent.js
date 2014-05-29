
define(['we','ember'], function (we) {

  App.WeMessengerComponent = Ember.Component.extend({
    contacts: [],
    openContacts: [],
    isListOpen: true,
    init: function initWeMessengerComponent(){
      this._super();
      var _this = this;

      // get contact list on innit
      var store = this.get('store');

      console.warn('we messenger innit');
      // get contact list on innit
      we.messenger.getContactList(function(error,contactsList){
        if(error){
          console.error(error);
        }
        _this.set('contacts',contactsList);
      });

      we.events.on('weMessengerSendPublicMessage',function weMessengerSendPublicMessage(event, messageObj){
        console.warn('we messenger send public message', messageObj);
        var store = _this.get('store');

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

      we.events.on('weMessengerCloseContactBox',function(event, contact){
        _this.get('openContacts').removeObject(contact);
      });

      we.events.on('we-messenger-contact-connected',function(event, contact){
        var contacts = _this.get('contacts');
        var len = contacts.length;
        var inList = false;
        for(var i=0;i<len;i++){
          if(contacts[i].id == contact.id ){
            _this.set('contacts.'+i+'.messengerStatus', 'online');
            inList = true;
            break;
          }
        }

        if(!inList){
          _this.get('contacts').pushObject(contact);
        }

      });

      //we.events.on('we-messenger-message-received', _this.pushNewMessage);

      we.events.on('we-messenger-contact-diconnected',function(event, contact){
        var contacts = _this.get('contacts');
        var len = contacts.length;
        var inList = false;
        for(var i=0;i<len;i++){
          if(contacts[i].id == contact.id ){
            _this.set('contacts.'+i+'.messengerStatus', 'offline');
            inList = true;
            break;
          }
        }

        if(!inList){
          _this.get('contacts').pushObject(contact);
        }
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
        //this.get('openContacts').pushObject({      name: 'oi2',})
      },
      closeList: function closeList(){
        this.set('isListOpen', false);
      },
      startTalk: function startTalk(user){
        var _this = this;

        we.events.trigger('weMessengerOpenContactBox', user);

        if(!_this.isOpenContactBox(user)){
          _this.get('openContacts').pushObject(user);
        }

      },
      openPublicBox: function(){
        we.events.trigger('weMessengerOpenPublicBox');
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
    },
    isOpenContactBox: function isOpenContactBox(user){
      var openContacts = this.get('openContacts');
      var len = openContacts.length;
      for(var i=0; i < len; i++){
        if(openContacts[i].id == user.id){
          return true;
        }
      }
      return false;
    }

  });

  // Helper functions

});