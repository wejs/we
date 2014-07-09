
define(['we','ember','ember-data'], function (we) {
  var attr = DS.attr;

  App.Image = DS.Model.extend({
    name: attr('string'),
    size: attr('number'),
    url: attr('string'),
    width: attr('string'),
    height: attr('string'),
    originalFilename: attr('string'),
    mime: attr('string'),

    // flags
    active: attr('boolean', {
      defaultValue: true
    }),


    user_id: DS.belongsTo('user'),

    creator: DS.belongsTo('user'),

    createdAt: attr('date'),
    updatedAt: attr('date')
  });

});
