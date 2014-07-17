
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
    sharedWith: attr(),

    sharedIn: attr(),

    comments: attr(),

    activities: DS.hasMany('activity'),
    // sharedIn: DS.hasMany('group')

  });

 App.PostSerializer = App.ApplicationSerializer.extend({
    serialize: function(record, options) {
      var json = this._super(record, options);
      // dont send comments on post save or update
      delete json.comments;

      return json;
    },
 });


});
