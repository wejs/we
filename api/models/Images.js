/**
 * Images
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */
var mv = require('mv');
var uuid = require('node-uuid');
// image converter
var gm = require('gm');
var path = require('path');
var mime = require('mime');

module.exports = {
  schema: true,
  attributes: {

    name: {
      type: 'STRING'
    },

    size: {
      type: 'integer'
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

    'user_id': {
      type: 'string'
    },

    creator: {
      type: 'string'
    },

    width: {
      type: 'string'
    },

    height: {
      type: 'string'
    },

    inPost: {
      model: 'post'
    },

    // Override toJSON instance method
    // to remove password value
    toJSON: function() {
      var obj = this.toObject();
      obj.urls = Images.getStyleUrlFromImage(obj);
      // set default objectType
      obj.objectType = 'image';
      return obj;
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

    // TODO add suport to files withouth extension
    if(!file.extension){
      sails.log.error('File extension not found', file);
      return callback('File extension not found', null);
    }

    file.newName =  uuid.v1() + '.' + file.extension;

    var newFilePath = path.resolve(sails.config.imageUploadPath + '/' + 'original' + '/' + file.newName);
    //var newFilePath = sails.config.appPath + '/' + sails.config
    //.imageUploadPath + '/' + 'original' + '/' + file.newName;

    mv(file.path, newFilePath,{mkdirp: true}, function(err){
      if(err) return callback(err, null);

      file.mime = mime.lookup(newFilePath);

      console.log('arquivo movido para:',newFilePath);
      // get image size
      gm(newFilePath)
      .size(function (err, size) {
        if (err) return callback(err);

        file.width = size.width;
        file.height = size.height;

        callback(null, file);
      });

    });
  },
  getStyleUrlFromImage: function(image){
    return {
      original: '/api/v1/images/original/' + image.name,
      thumbnail: '/api/v1/images/thumbnail/' + image.name,
      mini: '/api/v1/images/mini/' + image.name,
      medium: '/api/v1/images/medium/' + image.name,
      large: '/api/v1/images/large/' + image.name
    };
  },

  uploadMultiple: function(files, creatorId, callback){
    var uploadedFiles = [];
    var fileUp;

    async.each(files, function(file, next){
      file.path =  file.fd;

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
      sails.log.error('Error on upload image:',err,files);
      if(err){
        callback(err, null);
      }else{
        callback(null, uploadedFiles);
      }
    });
  }

};