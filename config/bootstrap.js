/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

var mkdirp = require('mkdirp');

module.exports.bootstrap = function (cb) {
  // extend sails.js with extra helpers
  require('we-helpers').extendSails(sails);

  // set default upload configs folder
  if(!sails.config.fileUploadPath){
    sails.log.info('sails.config.fileUploadPath not found in the default folder uploads/files');
    sails.config.fileUploadPath = 'uploads/files';
  }

  if(!sails.config.imageUploadPath){
    sails.log.info('sails.config.imageUploadPath not found in the default folder uploads/images');
    sails.config.imageUploadPath = 'uploads/images';
  }

  if(sails.config.enviroment === 'test'){
    return cb()
  }

  // create the image style if not exist
  sails.config.upload.image.avaibleStyles.forEach(function(style){
    var path = sails.config.subAppPath + '/'+ sails.config.imageUploadPath + '/' + style ;
    mkdirp(path,function(e){
      if(e){
        sails.log.error('Cant create image directory on sails bootstrap',style,e);
      }
    });
  });


  cb();
};
