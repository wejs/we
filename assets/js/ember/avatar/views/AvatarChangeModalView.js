
define(['we','ember'], function (we) {

  App.AvatarChangeModalView = Ember.View.extend({
    templateName: 'avatar/changeModal',
    init: function() {
      this._super();
      var thisView = this;
      this.set("controller", App.AvatarChangeModalController.create());

      console.warn('avatar modal');
      //this.set("controller", App.AvatarChangeModalController.create());
    }
  });

});

