
define(['we','ember','ember-data'], function (we) {
  var attr = DS.attr;

  App.Activity = DS.Model.extend({
    body: attr('string'),

    createdAt: attr('date'),
    updatedAt: attr('date'),

    verb: 'string',

    // flags
    active: attr('boolean', {
      defaultValue: true
    }),

    // relationship s
    actor:  DS.belongsTo('user'),

    user:  DS.belongsTo('user'),

    post:  DS.belongsTo('post'),

    comment:  DS.belongsTo('comment')
  });

});
