
define(['we','ember'], function (we) {
  var _this;

  App.HomeController = Ember.ObjectController.extend({
    isAuthenticated: false,
    init: function(){
      this._super();
      _this = this;

      if(we.isAuthenticated()){
        _this.set('isAuthenticated', true);

      }else{
        _this.set('isAuthenticated', false);
      }
    }
  });

});