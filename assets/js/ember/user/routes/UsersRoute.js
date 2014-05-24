
define(['we','ember'], function (we) {

  return Ember.Route.extend({
    model: function() {
      return this.store.find('user');
    }
  });

});
