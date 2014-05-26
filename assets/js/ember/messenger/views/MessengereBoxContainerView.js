
define(['we','ember'], function (we) {

  App.MessengereBoxContainerView = Ember.ContainerView.extend({
    childViews: [],
    init: function(){
      this._super();
      var self = this;

      we.events.on('weMessengerOpenPublicBox', function(event, box){

        self.pushObject(App.WeMessengerPublicBoxComponent.create());
        console.warn(self.toArray());

      });

    }
  });

});