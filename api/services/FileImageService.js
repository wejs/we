var fs = require('fs');
var gm = require('gm');

exports.getImageStyles = function(){
  return sails.config.upload.image.avaibleStyles;
};

exports.getImagePath = function(imageName, imageStyle){
  if(!imageStyle) imageStyle = 'original';
  return sails.config.subAppPath + '/'+ sails.config.imageUploadPath + '/' + imageStyle + '/' + imageName;
};

exports.getFileOrResize = function getFileOrResize(fileName,imageStyle ,callback){

  // TODO change to image upload path
  var path = FileImageService.getImagePath(fileName, imageStyle);

  fs.readFile(path,function (err, contents) {
    if (err){
      if(err.code != 'ENOENT' || imageStyle == 'original' ){
        return callback(err);
      }

      var originalFile = FileImageService.getImagePath(fileName, 'original');

      var width = sails.config.upload.image.styles[imageStyle].width;
      var heigth = sails.config.upload.image.styles[imageStyle].heigth;

      // resize and remove EXIF profile data
      var ii = gm(originalFile)
      .resize(width, heigth)
      .noProfile()
      .write(path, function (err) {
        if (err) return callback(err);
        fs.readFile(path,function (err, contents) {
          callback(null, contents);
        });
      });

    }else{
      callback(null, contents);
    }
  });
};

/**
 * Delete old image styles for one image
 * @param  {string}   imageName
 * @param  {Function} callback
 */
exports.deleteImageStylesWithImageName = function(imageName, callback){
  var imageStyles = FileImageService.getImageStyles();
  async.each(imageStyles,function(style, next){
    var path = FileImageService.getImagePath(imageName, style);
    fs.exists(path, function(exists) {
      console.log(path,exists);
      if (exists) {
        fs.unlink(path, function (err) {
          if (err) throw err;
          next();
        });
      } else {
        next();
      }
    });
  },callback);
};


exports.resizeImageAndReturnSize = function(originalFile, cords, callback){
  gm(originalFile)
  .crop(cords.width, cords.height, cords.x, cords.y)
  .write(originalFile, function (err) {
    if (err){
      sails.log.error('Error on crop file:',image, err);
      return callback(err);
    }
    // get image size
    gm(originalFile).size(function (err, size) {
      if (err) return callback(err);

      return callback(null,size);
    });
  });
};