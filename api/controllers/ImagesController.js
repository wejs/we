/**
 * ImagesController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var util = require('util');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

var fs = require('fs');
// image converter
var gm = require('gm');

module.exports = {

  list : function (req, res){
    Images.find()
    .where( actionUtil.parseCriteria(req) )
    .limit( actionUtil.parseLimit(req) )
    .skip( actionUtil.parseSkip(req) )
    .sort('updatedAt DESC')
    //.populate('comments')
    .exec(function(err, images) {
      if (err) return res.serverError(err);
      res.send({
        image: images
      });
    });
  },

  findOne : function (req, res){
    var fileName = req.param('name');
    if(!fileName){
      return res.send(404);
    }

    var avaibleImageStyles = sails.config.upload.image.avaibleStyles;

    var imageStyle = req.param('style');
    if(!imageStyle){
      imageStyle = 'original';
    }else if(
      imageStyle != 'original' &&
      avaibleImageStyles.indexOf(imageStyle) === -1)
    {
      return res.send(400,'Image style invalid');
    }

    Images.findOne()
    .where({name: fileName})
    .exec(function(err, image) {
      if (err) return res.negotiate(err);

      if(!image){
        sails.log.debug('Image:findOne:Image not found:',fileName);
        return res.send(404);
      }

      FileImageService.getFileOrResize(fileName, imageStyle ,function(err, contents){
        if(err){
          sails.log.error('Image:findOne:Error on get image:',err);
          return res.send(500);
        }

        if(!contents){
          return res.send(404);
        }

        if(image.mime){
          res.contentType(image.mime);
        }else{
          res.contentType('image/png');
        }

        res.send(contents);
      });

    });
  },

  findOneReturnData : function (req, res){
    var query = {};
    var fileName = req.param('name');
    if(!fileName){
      return res.send(404);
    }
    Images.findOne()
    .where({name: fileName})
    .exec(function(err, image) {
      if (err) {
        sails.log.error('Error on get image from BD: ',err, fileName);
        return res.send(404);
      }
      if(!image){
        return res.send(404);
      }
      res.send({
        image: image
      });
    });
  },

  /**
   * Upload file to upload dir and save metadata on database
   */
  createRecord : function createMultiplesRecords(req, res){
    if(!req.user || !req.user.id){
      return res.forbidden('Logged in user not found');
    }

    var creatorId = req.user.id;

    req.file('images').upload(function (err, files) {
      if (err) return res.serverError(err);
      Images.uploadMultiple(files, creatorId, function(err, uploadedFiles){
        if(err){
          res.send(
            {
              "files":[],
              "error": err
            }
          );
        } else {
          Images.create(uploadedFiles).exec(function(error, salvedFiles) {
            if (err) return res.serverError(err);

            sails.log.warn('salvedFiles',salvedFiles);
            res.send({
              images: salvedFiles
            });

          });
        }
      });
    });
  },

  /**
   * Crop one file by file id
   */
  cropImage : function (req, res){

    var fileId = req.param('id');
    var cords = {};
    cords.width = req.param('w');
    cords.height = req.param('h');
    cords.x = req.param('x');
    cords.y = req.param('y');

    if(!fileId ) return res.send(400,'File id param is required');

    if(!cords.width || !cords.height || cords.x === null || cords.y === null){
      return res.send(400,'Width, height, x and y params is required');
    }

    if(!req.user || !req.user.id){
      return res.send(404);
    }

    var user_id = req.user.id;

    Images.findOne()
    .where({id: fileId})
    .exec(function(err, image) {
      if (err) {
        sails.log.error('Error on get image from BD: ',err, fileName);
        return res.send(404);
      }
      if(!image || user_id != image.creator){
        sails.log.error('Image crop forbiden');
        return res.send(404);
      }

      var originalFile = FileImageService.getImagePath(image.name, 'original');


      sails.log.debug('Filename:', image.name);

      FileImageService.resizeImageAndReturnSize(originalFile, cords, function(err, size){

        image.width = size.width;
        image.height = size.height;
        // save the new width and height on db
        image.save();

        sails.log.debug('resize image to:', cords);

        sails.log.debug('result:',size.width, size.width);



        // delete old auto generated image styles
        FileImageService.deleteImageStylesWithImageName(image.name, function(err){
          if (err){
            sails.log.error('Error on delete old image styles:',image, err);
            return res.send(500);
          }
          res.send({
            image: image
          });
        });
      });
    });
  }
};
