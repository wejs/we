
define(['we','ember'], function (we) {

  App.ContactButtomView = Ember.View.extend(App.LoggedInMixin, {
    template: Ember.Handlebars.compile('<span class="glyphicon glyphicon-plus"></span> {{view.label}}'),
    tagName: 'button',
    classNames: ['btn','btn-xs','btn-default'],
    label: function(){
      switch(this.get('contactStatus')){
        case 'requested':
          return 'Contact requested';
        case 'requestsToYou':
          return 'Accept contact request';
        case 'accepted':
          return 'Contact';
        case 'ignored':
        case 'currentUser':
          return '';
        default:
          return 'Add in contacts';
      }
    }.property('contactStatus'),
    disabled: function(){
      switch(this.get('contactStatus')){
        // case 'requestsToYou':
        // case 'accepted':
        //   return null;
        case 'requested':
        case 'ignored':
        case 'currentUser':
          return 'disabled';
        default:
          return null;
      }

    }.property('contactStatus'),
    attributeBindings: ['contact','disabled'],
    click: function(){
      this.get('controller').send('contactButtomClicked');
    }
  });

});

