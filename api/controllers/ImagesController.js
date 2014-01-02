/**
 * ImagesController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var fs = require('fs');

module.exports = {

  index : function (req, res, next){
    console.log('images index controler');
    res.send(
      {"files":[]}
    );
  },

  find : function (req, res, next){

    var fileId = req.param('id');

    if(fileId){
      Images.findOneById(fileId).done(function(err, image) {
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
  create : function (req, res, next){
   // console.log('files:',req.files);
   // console.log('file:',req.files.files[0]);

    var newFiles = [];
    var newFile = {};

    async.each(req.files.files, Files.upload , saveFiles);

    //Files.upload(req.files.files, saveFile, complete);

    function saveFiles(err){
      if(err){
        console.log('Error on file upload',err);
      }else{

        async.each(req.files.files, function(file, affterSave){
          newFile = {
            'name': file.newName,
            'size': file.size,
            'originalFilename': file.name,
            //'mime': file.mime
          };

          Files.create(newFile).done(function(error, salvedFile) {
              if (error) {
                console.log(error);
               // res.send(500, {error: res.i18n("DB Error") });
              } else {
                //console.log('salved File:',salvedFile);
                salvedFile.thumbnailUrl = 'http://localhost:1333/imgs/avatars/user-avatar.png';
                salvedFile.url = 'http://localhost:1333/imgs/avatars/user-avatar.png';
                salvedFile.deleteUrl = '/files/' + salvedFile.id;
                salvedFile.deleteType = 'DELETE';

                newFiles.push(salvedFile);
                affterSave();
              }
          });
        }, complete);
      }
    }

    function complete(err){
      console.log('end file salved');
      console.log(newFiles);
      res.send({
        "files": newFiles
      });
    }

  }

};
