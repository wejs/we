
define(['we','ember'], function (we) {
  App.UserNameView = Ember.View.extend({
    tagName: 'span',
    classNames: ['username'],
    'data-user-id': function getDataUserId(){
      return this.get('user.id');
    }.property('user.id'),
    attributeBindings: ['data-user-id'],
    layout:  Ember.Handlebars.compile('{{#link-to "user" view.user.id}}{{view.user.displayName}}{{/link-to}}')
  });
});