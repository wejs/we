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
  schema: true,
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

    creator: {
      model:'user'
    },

    width: {
      type: 'string'
    },

    height: {
      type: 'string'
    }

  },


  //-- Lifecycle Callbacks

  beforeCreate: function(record, next) {
    // sanitize
    record = SanitizeHtmlService.sanitizeAllAttr(record);
    next();
  },

  beforeUpdate: function(record, next) {
    // sanitize
    record = SanitizeHtmlService.sanitizeAllAttr(record);
    next();
  },

  // Upload the files
  upload: function(file, callback) {

    file.extension = file.filename.split('.').pop();

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

      file.newFilePath = newFilePath;

      callback(err, file);
    });
  },

  uploadMultiple: function(files, creatorId, callback){
    var uploadedFiles = [];
    var fileUp;

    async.each(files, function(file, next){
      file.path = '.tmp/uploads/' + file.filename;

      Images.upload(file, function(err){
        if(err){
          next(err);
        } else {
          fileUp = file;
          fileUp.name = file.newName;
          fileUp.originalFilename = file.originalFilename;
          fileUp.size = file.size;
          fileUp.extension = file.extension;
          fileUp.creator = creatorId;
          uploadedFiles.push(fileUp);
          next();
        }
      });
    },function(err){
      if(err){
        callback(err, null);
      }else{
        callback(null, uploadedFiles);
      }
    });
  }

};