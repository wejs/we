
define(['we','ember','ember-data'], function (we) {
  var attr = DS.attr;

  App.Contact = DS.Model.extend({
    status: attr('string', {
      defaultValue: 'requested'
    }),

    // relationship
    from: attr(),
    to: attr(),

    createdAt: attr('date'),
    updatedAt: attr('date')
  });

});
