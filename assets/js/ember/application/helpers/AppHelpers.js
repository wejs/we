
define([
  'we',
  'showdown',
  'moment',
  'ember'
], function (we, Showdown, moment) {

  var showdown = new Showdown.converter();

  Ember.Handlebars.helper('format-markdown', function(input) {
    return new Handlebars.SafeString(showdown.makeHtml(input));
  });

  Ember.Handlebars.helper('format-date', function(date) {
    return moment(date).fromNow();
  });

  // Localization helper
  if(we.config.language == "en-us"){
    // dont translate if are the default system language
    Ember.Handlebars.registerHelper('t', function (property, options) {
      return property;
    });
  }else{
    Ember.Handlebars.registerHelper('t', function (property, options) {
      if(property){
        return we.i18n( property );
      } else{
        return '';
      }
    });
  }


  // Limit string length
  // usage: {{substr description max=20}}
  // or {{substr description start=5 max=20}}
  Ember.Handlebars.registerHelper('substr', function(property, options) {

    var str = Ember.get(this, property);
    var opts = options.hash;

    var start = opts.start || 0;
    var len = opts.max;

    var out = str.substr(start, len);

    if (str.length > len)
        out += '...';

    return new Handlebars.SafeString(out);
  });

});