

define(['we','ember'], function (we) {

  App.UserController = Ember.ObjectController.extend({
    defaultlanguages: [
      'pt-br',
      'en-us'
    ],
    contactStatus: function() {
      return this.get('contact.status');
    }.property('contact','contact.status'),
    showSocialActions: function(){
      if(this.get('user.id') == we.authenticatedUser.id){
        return false;
      }else{
        return true;
      }
    }.property('user.id'),
    actions: {
      edit: function edit(){
        this.setProperties({
          'isEditing': true,
          'hasChangesToSave': true
        });
      },
      cancel: function edit(){
        this.set('isEditing', false);
      },
      save: function save(){
        var self = this;

        // do nothin if is already salved
        if( self.get('user.currentState.stateName') == 'root.loaded.saved' ){
          return ;
        }

        // save the model
        self.get('user').save().then(function(){
          // updated!
          self.setProperties({
            'isEditing': false,
            'hasChangesToSave': false
          });

        });
      },
      remove: function remove(){
        this.set('isEditing', false);
      },

      contactButtomClicked: function() {
        switch(this.get('contactStatus')){
          case 'requested':
            // TODO!
            this.send('cancelContactRequest');
            break;
          case 'requestsToYou':
            this.send('acceptAddInContactList');
            break;
          case 'accepted':
            this.send('deleteContact');
            break;
          case 'ignored':
            this.send('deleteContact');
            break;
          default:
            this.send('requestAddInContactList');
        }
      },
      requestAddInContactList: function(){
        var self = this;

        Ember.$.post('/api/v1/user/'+this.get('user.id')+'/contact-request')
        .done(function(data) {
          console.warn('contact',data.contact);
          self.set('contact',data.contact);
        })
        .fail(function(data) {
           Ember.Logger.error('Error on requestAddInContactList contact:',data.contact);
        });

      },
      acceptAddInContactList: function(){
        var self = this;

        Ember.$.post('/api/v1/user/'+this.get('user.id')+'/contact-accept')
        .done(function(data) {
          console.warn('acceptAddInContactList',data.contact);
          self.set('contact.status',data.contact.status);
        })
        .fail(function(data) {
           Ember.Logger.error('Error on acceptAddInContactList contact:',data);
        });
      },

      ignoreContact: function(){
        var self = this;

        Ember.$.post('/api/v1/user/'+this.get('user.id')+'/contact-ignore')
        .done(function(data) {
          console.warn('ignoreContact',data.contact);
          self.set('contact.status',data.contact.status);
        })
        .fail(function(data) {
           Ember.Logger.error('Error on ignoreContact contact:',data);
        });

      },
      deleteContact: function(){
        var self = this;

        Ember.$.ajax({
          url: '/api/v1/user/'+this.get('user.id')+'/contact/',
          type: 'DELETE'
        })
        .done(function(data) {
          console.warn('ignoreContact',data.contact);
        })
        .fail(function(data) {
           Ember.Logger.error('Error on deleteContact:',data);
        });
      }
    }
  });

});

/*


  // ignore
  'post /api/v1/user/:contactId/contact-ignore': {
    controller    : 'contact',
    action        : 'ignoreContact'
  },
  // delete contact relation
  'delete /api/v1/user/:contactId/contact/': {
    controller    : 'contact',
    action        : 'deleteContact'
  },



 */