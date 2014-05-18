/** Copyright 2014, Alberto Souza
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

// starts we.js lib
// TODO move this to amber logic

define('emberApp',[
  'we',
  'showdown',
  'async',
  'ember',
  'weEmberPlugin'
], function (we, Showdown, async) {

  window.App = Ember.Application.create({
    locale: 'en_US',
    LOG_TRANSITIONS: true, // basic logging of successful transitions
    LOG_TRANSITIONS_INTERNAL: true, // detailed logging of all routing steps
    LOG_VIEW_LOOKUPS: true
  });

  App.ApplicationAdapter = DS.SailsRESTAdapter.extend({
    namespace: 'api/v1'
  });

  App.Router.reopen({
    location: 'history'
  });

  var modelNames = Object.keys(we.emberApp.models);

  async.each( modelNames, function(modelName, next){

    var modelVarName = modelName.charAt(0).toUpperCase() + modelName.slice(1).toLowerCase();
    App[modelVarName] = we.emberApp.models[modelName];



    App[modelVarName + 'Route'] = Ember.Route.extend({
      model: function() {
        return this.store.find(modelName);
      }
    });

    console.log('modelName',modelName, modelVarName);
    next();

  }, function(){

    App.Router.map(function() {
      this.resource('home', {
        path: '/'
      });

      var thisPointer = this;

      modelNames.forEach(function(modelName){
        this.resource(modelName, function() {
          this.route(modelName);
        });

      }, this);

    });

  });

  var showdown = new Showdown.converter();

  Ember.Handlebars.helper('format-markdown', function(input) {
    return new Handlebars.SafeString(showdown.makeHtml(input));
  });

  Ember.Handlebars.helper('format-date', function(date) {
    return moment(date).fromNow();
  });



  Ember.Handlebars.registerHelper('t', function (property, options) {
    if(property){
      return we.i18n( property );
    } else{
      return '';
    }
  });

//  require([]);


App.ModalLoginView = Ember.View.extend({
  templateName: 'auth-login',

  init: function() {
    this._super();
    //this.set("controller", App.ModalLoginController.create());
  }
});


App.AuthViewRegister = Ember.View.create({
  templateName: 'auth-register'
});
  return App;

});
