/**
 * ImagesController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var fs = require('fs');

module.exports = {

  list : function (req, res){
    res.send(
      {"files":[]}
    );
  },

  findOne : function (req, res){

    var fileId = req.param('id');

    if(fileId){
      Images.findOneById(fileId).exec(function(err, image) {
        if (err) {
            console.log('Error on get image from BD: ',err );
            res.send(404);
        } else {

          if( image ){
            // TODO change to image upload path
            var path = 'uploads/' + image.name;

            fs.readFile(path,function (err, contents) {

              if (err){
                console.log(err);
                return res.send(404);
              }else{
                res.contentType('image/png');
                res.send(contents);
              }
            });
          } else {
            return res.send(404);
          }
        }
      });
    }else{
      return next();
    }
  },

  /**
   * Upload file to upload dir and save metadata on database
   */
  createRecord : function (req, res){
   // console.log('files:',req.files);
   // console.log('file:',req.files.files[0]);

    if(!req.user || !req.user.id){
      return res.forbidden('Logged in user not found');
    }

    var creatorId = req.user.id;

    req.file('files').upload(function (err, files) {
      if (err) return res.serverError(err);

      sails.log.warn('files uploaded:',files);

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
  }
};
