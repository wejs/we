
define(['we','ember','ember-data'], function (we) {
  var attr = DS.attr;

  App.Comment = DS.Model.extend({
    body: attr('string'),

    createdAt: attr('date'),
    updatedAt: attr('date'),

    // flags
    active: attr('boolean', {
      defaultValue: true
    }),

    // relationship s
    creator:  DS.belongsTo('user'),
    post:  DS.belongsTo('post'),
    activities: DS.hasMany('activity')
    // sharedIn: DS.hasMany('group')

  });

});
