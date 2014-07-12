
define(['we','ember','ember-data'], function (we) {
  var attr = DS.attr;

  App.Post = DS.Model.extend({
    body: attr('string'),

    createdAt: attr('date'),
    updatedAt: attr('date'),

    // flags
    active: attr('boolean', {
      defaultValue: true
    }),

    // relationship s
    creator:  DS.belongsTo('user'),
    sharedWith: DS.hasMany('user',{
      inverse: 'sharedWithMe'
    }),
    sharedIn: DS.hasMany('group'),

    comments: DS.hasMany('comment'),
    activities: DS.hasMany('activity'),
    // sharedIn: DS.hasMany('group')

  });

});
