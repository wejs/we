
define(['we','ember'], function (we) {

  App.UserController = Ember.ObjectController.extend({
    isEditing: false,
    defaultlanguages: [
      'pt-br',
      'en-us'
    ],
    // TODO user this variable to show and hide salve buttom
    hasChangesToSave: false,
    showSocialActions: function(){
      if(this.get('model.id') == we.authenticatedUser.id){
        return false;
      }else{
        return true;
      }

    }.property('model.id'),
    activities: function() {
      var user = this.get('model');
      if(user && user.id){
        return this.store.find('post', { creator: user.id });
      }else{
        return [];
      }
    }.property('model.id'),
    actions: {
      edit: function edit(){
        this.setProperties({
          isEditing: true,
          hasChangesToSave: true
        });
      },
      cancel: function edit(){
        this.set('isEditing', false);
      },
      save: function save(){
        var _this = this;

        // do nothin if is already salved
        if( _this.get('model.currentState.stateName') == 'root.loaded.saved' ){
          return ;
        }

        // save the model
        _this.get('model').save().then(function(){
          // updated!
          _this.setProperties({
            isEditing: false,
            hasChangesToSave: false
          });

        });
      },
      remove: function remove(){
        this.set('isEditing', false);
      }
    }
  });

});
