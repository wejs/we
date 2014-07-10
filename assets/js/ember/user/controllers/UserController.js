
define(['we','ember'], function (we) {

  App.UserController = Ember.ObjectController.extend({
    defaultlanguages: [
      'pt-br',
      'en-us'
    ],
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
        var _this = this;

        // do nothin if is already salved
        if( _this.get('user.currentState.stateName') == 'root.loaded.saved' ){
          return ;
        }

        // save the model
        _this.get('user').save().then(function(){
          // updated!
          _this.setProperties({
            'isEditing': false,
            'hasChangesToSave': false
          });

        });
      },
      remove: function remove(){
        this.set('isEditing', false);
      },

      requestAddInContactList: function(){
        var _this = this;
        var store = this.get('store');
        var to = this.get('user');
        var contact = {};
        var from = store.getById('user', App.currentUser.get('id'));

        contact.from = from;

        contact = store.createRecord('contact', {from: from});
        contact.get('users').pushObject(from);
        contact.get('users').pushObject(to);

        contact.save()
        .then(function(contact){
          _this.set('contact',contact);
          console.warn(contact);
        });
      },
      acceptAddInContactList: function(){
        var contact = this.get('model.contact');


        contact.set('status','accepted');
        console.warn('contact',contact);
        contact.save();

      }
    }
  });

});
