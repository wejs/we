
define(['we','ember','ember-data'], function (we) {
  var attr = DS.attr;

  App.Group = DS.Model.extend({
    name: attr('string'),
    type: attr('string',  {
      defaultValue: 'group'
    }),

    // public | restrict | private | hidden
    privacity: attr('string',  {
      defaultValue: 'public'
    }),

    // relationship s
    logo: DS.belongsTo('image'),
    creator: DS.belongsTo('user'),

    createdAt: attr('date'),
    updatedAt: attr('date')
  });

});
