
define(['we','ember'], function (we) {
  var _this;

  App.HomeController = Ember.ArrayController.extend({
    isAuthenticated: false,
    sortProperties: ['createdAt'],
    sortAscending: false,
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