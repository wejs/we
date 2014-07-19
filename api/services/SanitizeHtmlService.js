var sanitizeHtml = require('sanitize-html');

// TODO move this to sails config
var sanitizeConfig = {
  allowedTags: [
    // text blocks
    'p', 'pre', 'blockquote', 'br',
    // text format
    'b', 'i', 'em', 'strong',  'u',
    'h1', 'h2', 'h3', 'h4', 'h5','h5',
    // list
    'ul', 'ol', 'nl', 'li'
  ],
  selfClosing: [
    'br',
    // 'img',
    // 'hr'
  ],
  // allowedAttributes: {
  //   'span': [ 'style' ]
  // }
};

exports.sanitize = function(dirty){
  return sanitizeHtml(dirty, sanitizeConfig);
};

exports.sanitizeAllAttr = function(obj){

  for (var prop in obj) {
    if(prop !== 'id'){
      if(typeof obj[prop] == 'string'){
        obj[prop] = SanitizeHtmlService.sanitize(obj[prop]);
      }
    }
  }

  return obj;

  //return sanitizeHtml(dirty, sanitizeConfig);
};

