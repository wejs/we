define(['we','ember'], function (we) {
  App.ApplicationController = Ember.Controller.extend({
    isAuthenticated: false,
    init: function(){
      this._super();
      var _this = this;

      if(we.isAuthenticated()){
        _this.isAuthenticated = true;

      }else{
        _this.isAuthenticated = false;
      }
    }
  });

});