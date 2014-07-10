
define(['we','ember','ember-data'], function (we) {
  var attr = DS.attr;

  App.Contact = DS.Model.extend({
    status: attr('string', {
      defaultValue: 'requested'
    }),

    // relationship
    from: DS.belongsTo('user'),
    users: DS.hasMany('user'),

    createdAt: attr('date'),
    updatedAt: attr('date')
  });

});
