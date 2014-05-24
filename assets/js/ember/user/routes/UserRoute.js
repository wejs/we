
define(['we','ember'], function (we) {

  return Ember.Route.extend({
    model: function(params) {
      return this.store.find('user', params.user_id);
    }
  });
});
