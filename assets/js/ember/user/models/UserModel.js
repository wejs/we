
define(['we','ember','ember-data'], function (we) {
  var attr = DS.attr;

  App.User = DS.Model.extend({
    username: attr('string'),
    biography: attr('string'),
    email: attr(),
    displayName: attr('string'),
    birthDate: attr('date'),
    image: attr('string'),
    avatarId: attr('string'),
    language: attr('string',  {
      defaultValue: 'pt-br'
    }),

    // flags
    isAdmin: attr('boolean', {
      defaultValue: false
    }),
    isModerator: attr('boolean', {
      defaultValue: false
    }),
    active: attr('boolean', {
      defaultValue: false
    }),

    // relationship s
    avatar:  DS.belongsTo( 'image' ),
    sharedWithMe: DS.hasMany('post',{
      inverse: 'sharedWith'
    }),

    contacts: DS.hasMany('user',{
      inverse: 'users'
    }),

    createdAt: attr('date'),
    updatedAt: attr('date')
  });

});
