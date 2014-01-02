/**
 * Images
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */
var mv = require('mv');
var uuid = require('node-uuid');

module.exports = {

//  adapter: 'sails-local-fs'

  attributes: {

    name: {
        type: 'STRING'
    },

    size: {
      type: 'integer'
    },

    url: {
        type: 'url'
    },

    active: {
      type: 'boolean'
    },

    originalFilename: {
      type: 'string'
    },

    mime: {
      type: 'string'
    },

    user_id: {
      type: 'string'
    },

    width: {
      type: 'string'
    },

    height: {
      type: 'string'
    }

  },

  // Upload the files
  upload: function(file, callback) {

    file.extension = file.name.split('.').pop();

    file.newName =  uuid.v1() + '.' + file.extension;

    //console.log('config:',sails.config.express.bodyParser);
    // UPLOAD
    //console.log(sails.config.appPath);
    var newFilePath = sails.config.appPath + '/uploads/' + file.newName;
    //console.log(newFilePath);

    mv(file.path, newFilePath,{mkdirp: true}, function(err){
      if(err){
        console.log('error in MV:',err);
      }else{
        console.log('arquivo movido para:',newFilePath);
      }

      callback(err);
    });

  },
  // Before create Callback
  beforeCreate: function(file, next) {

    next();
  }

};