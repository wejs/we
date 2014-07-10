
define(['we','ember'], function (we) {

  App.ContactButtomView = Ember.View.extend(App.LoggedInMixin, {
    template: Ember.Handlebars.compile('<span class="glyphicon glyphicon-plus"></span> {{view.label}}'),
    tagName: 'button',
    classNames: ['btn','btn-xs','btn-default'],
    label: function(){
      var text = '';
      var fromId = this.get('contact.from.id');
      var currentUserId = App.currentUser.get('id');

      switch(this.get('contact.status')){
        case 'requested':
          if(currentUserId == fromId){
            text = 'Contact requested';
          }else{
            text = 'Accept contact request';
          }
          break;
        case 'accepted':
          text = 'Contact';
          break;
        case 'ignored':
          text = '';
          break;
        default:
          text = 'Add in contacts'
      }
      return text;
    }.property('contact.status'),
    disabled: function(){
      switch(this.get('contact.status')){
        case 'requested':
          var fromId = this.get('contact.from.id');
          var currentUserId = App.currentUser.get('id');

          if(currentUserId == fromId){
            return 'disabled';
          }else{
            return null;
          }
          break;
        case 'accepted':
          return 'disabled';
          break;
        case 'ignored':
          return 'disabled';
          break;
        default:
          return null;
      }
    }.property('contact.status'),
    attributeBindings: ['contact','disabled'],
    click: function(evt){
      var status = this.get('contact.status');
      switch(status){
        case 'requested':
          this.get('controller').send('acceptAddInContactList');
          break;
        default:
          this.get('controller').send('requestAddInContactList');
          break;
      }

    }
  });

});

