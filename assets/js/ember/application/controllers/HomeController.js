
define(['we','ember'], function (we) {
  App.HomeController = Ember.ObjectController.extend({
    isAuthenticated: false,
    init: function(){
      this._super();
      var _this = this;

      if(we.isAuthenticated()){
        _this.set('isAuthenticated', true);

      }else{
        _this.set('isAuthenticated', false);
      }
    }
  });

});