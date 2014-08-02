define(['we','ember'], function (we) {
  App.ApplicationController = Ember.Controller.extend({
    isAuthenticated: false,
    init: function(){
      this._super();
      var self = this;
      var store = this.get('store');

      if(we.isAuthenticated()){
        self.isAuthenticated = true;

      }else{
        self.isAuthenticated = false;
      }
    }
  });

});