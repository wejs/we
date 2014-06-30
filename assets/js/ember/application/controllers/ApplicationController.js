define(['we','ember'], function (we) {
  var _this;

  App.ApplicationController = Ember.Controller.extend({
    isAuthenticated: false,
    init: function(){
      this._super();
      _this = this;

      if(we.isAuthenticated()){
        _this.isAuthenticated = true;

      }else{
        _this.isAuthenticated = false;
      }
    }
  });

});