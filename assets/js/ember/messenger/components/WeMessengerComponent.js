
define(['we','ember'], function (we) {

  App.WeMessengerComponent = Ember.Component.extend({
    contacts: [],
    openContacts: [],
    isListOpen: true,
    init: function initWeMessengerComponent(){
      this._super();
      var _this = this;

      // get contact list on innit
      we.messenger.getContactList(function(error,contactsList){
        if(error){
          console.error(error);
        }
        _this.set('contacts',contactsList);
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

      we.events.on('we-messenger-message-received', OnReceiveMessage);

      function OnReceiveMessage(event, message){

        // check if is open contact box for received message
        if(!_this.isOpenContactBox(message.fromId)){
          // if now is open try to get user from contacts
          var user = _this.getUserFromContacts(message.fromId);

          // user is in contacts
          if(user){
             we.events.trigger('weMessengerOpenContactBox', user);
            _this.get('openContacts').pushObject(user);

          // else get user from server
          }else{
            we.io.getUser(message.fromId ,function(error, user){
              we.events.trigger('weMessengerOpenContactBox', user);
              _this.get('contacts').pushObject(user);
              _this.get('openContacts').pushObject(user);
            });
          }
        }
      }
    },
    didInsertElement: function didInsertElement() {
      if (!this.get('store')) {
          throw 'WeMessengerComponent requires store for autocomplete feature. Inject as store=store';
      }
    },
    willDestroyElement: function willDestroyElement(){
      console.warn('TODO! willDestroyElement unsubscribe from events here', this);
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

        if(!_this.isOpenContactBox(user.id)){
          _this.get('openContacts').pushObject(user);
        }

      },
      openPublicBox: function(){
        we.events.trigger('weMessengerOpenPublicBox');
      }
    },
    getMessages: function getMessages(id, callback){
      // TODO change to use WEjs get messages
      var store = this.get('store');

      store.find('messages', { uid: id })
      .then(function(messages){
        callback(null,messages);
      }, function(error){
        callback(error,null);
      });
    },
    isOpenContactBox: function isOpenContactBox(userId){
      var openContacts = this.get('openContacts');
      var len = openContacts.length;
      for(var i=0; i < len; i++){
        if(openContacts[i].id == userId){
          return true;
        }
      }
      return false;
    },
    getUserFromContacts: function getUserFromContacts(userId){
      var contacts = this.get('contacts');
      var len = contacts.length;
      for(var i=0; i < len; i++){
        if(contacts[i].id == userId){
          return contacts[i];
        }
      }
      return false;
    }

  });


});