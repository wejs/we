
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
    sharedWith: attr('array'),

    sharedIn: attr('array'),

    comments: attr('array'),

    videos: attr('array'),

    links: attr('array'),

    images: attr('array'),

    activities: DS.hasMany('activity'),
    // sharedIn: DS.hasMany('group')

  });

 App.PostSerializer = App.ApplicationSerializer.extend({
    serialize: function(record, options) {
      var json = this._super(record, options);
      // dont send comments on post save or update
      delete json.comments;

      var i;
      // send only sharedWith ids
      if(json.sharedWith)
        for (i = json.sharedWith.length - 1; i >= 0; i--) {
          if(json.sharedWith[i].id){
            json.sharedWith[i] = json.sharedWith[i].id;
          }
        }
      // send only sharedIn ids
      if(json.sharedIn)
        for (i = json.sharedIn.length - 1; i >= 0; i--) {
          if(json.sharedIn[i].id){
            json.sharedIn[i] = json.sharedIn[i].id;
          }
        }

      return json;
    },
 });


});
