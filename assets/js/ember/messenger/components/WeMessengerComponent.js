

define(['we','ember'], function (we) {
  App.WeMessengerComponent = Ember.Component.extend({
    isListOpen: false,
    init: function(){
      this._super();

      var self = this;
      console.warn('we messenger innit');

    },
    actions: {
      openList: function(){
        console.warn('open');
        this.set('isListOpen', true);
      },
      closeList: function(){
        console.warn('close');
        this.set('isListOpen', false);
      }
    }
  });

});