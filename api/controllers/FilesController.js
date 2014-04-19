/**
 * FilesController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling files upload .
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  index : function (req, res, next){
    res.send(
      {"files":[]}
    );
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

          Files.create(newFile).exec(function(error, salvedFile) {
              if (error) {
                console.log(error);
               // res.send(500, {error: res.i18n("DB Error") });
              } else {
                //console.log('salved File:',salvedFile);
                salvedFile.thumbnailUrl = 'http://localhost:1333/images/avatars/user-avatar.png';
                salvedFile.url = 'http://localhost:1333/images/avatars/user-avatar.png';
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
    //mv(tmpFile.path, imageFolder + this.systemName, cb);
    /*
    res.send(
      {"files":[]}
    );
*/
  },


  /* Upload one file to server
  */
  upload: function (req, res, next) {
    console.log('no file upload',req);

    next();
  },

};

