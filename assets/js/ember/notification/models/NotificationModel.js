
define(['we','ember','ember-data'], function (we) {
  var attr = DS.attr;
  // MODEL
  App.Notification = DS.Model.extend({
    user_id: DS.belongsTo('user'),
    content_id: attr('number'),
    comment_id: attr('number'),

    type: attr('string'),

    gids: attr('string'),

    frequencia_email: attr('string'),

    text: attr('string'),

    follow_flag: attr('string'),

    notified: attr('string',{
      defaultValue: 'pendente'
    }),

    createdAt: attr('date')
  });
});