/**
 * UsersController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var passport = require('passport');
var fs = require('fs');
// sails controller utils
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
var util = require('util');


module.exports = {

  findOne: function findOneRecord (req, res) {

    var Model = actionUtil.parseModel(req);
    var pk = actionUtil.requirePk(req);
    var modelName = req.options.model || req.options.controller;

    var query = Model.findOne(pk);
    //query = actionUtil.populateEach(query, req.options);
    query.exec(function found(err, matchingRecord) {
      if (err) return res.serverError(err);
      if(!matchingRecord) return res.notFound('No record found with the specified `id`.');

      var resultObject = {};

      resultObject[modelName] = matchingRecord;
      res.send(resultObject);
    });

  },

  find: function findRecords (req, res) {

    // Look up the model
    var Model = actionUtil.parseModel(req);

    var modelName = req.options.model || req.options.controller;

    // Lookup for records that match the specified criteria
    var query = Model.find()
    .where( actionUtil.parseCriteria(req) )
    .limit( actionUtil.parseLimit(req) )
    .skip( actionUtil.parseSkip(req) )
    .sort( actionUtil.parseSort(req) );
    // TODO: .populateEach(req.options);
    //query = actionUtil.populateEach(query, req.options);
    query.exec(function found(err, matchingRecords) {
      if (err) return res.serverError(err);

      // Only `.watch()` for new instances of the model if
      // `autoWatch` is enabled.
      if (req._sails.hooks.pubsub && req.isSocket) {
        Model.subscribe(req, matchingRecords);
        if (req.options.autoWatch) {
          Model.watch(req);
        }
        // Also subscribe to instances of all associated models
        _.each(matchingRecords, function (record) {
          actionUtil.subscribeDeep(req, record);
        });
      }

      var resultObject = {};

      resultObject[modelName] = matchingRecords;
      res.send(resultObject);

    });
  },

  update: function(req, res, next) {
    // Look up the model
    var Model = User;

    // Locate and validate the required `id` parameter.
    var pk = actionUtil.requirePk(req);

    // Create `values` object (monolithic combination of all parameters)
    // But omit the blacklisted params (like JSONP callback param, etc.)
    var values = actionUtil.parseValues(req);

    // Omit the path parameter `id` from values, unless it was explicitly defined
    // elsewhere (body/query):
    var idParamExplicitlyIncluded = ((req.body && req.body.id) || req.query.id);
    if (!idParamExplicitlyIncluded) delete values.id;

    // remove createdAt and updatedAt to let sails.js set it automaticaly
    delete values.createdAt;
    delete values.updatedAt;

    // Find and update the targeted record.
    //
    // (Note: this could be achieved in a single query, but a separate `findOne`
    //  is used first to provide a better experience for front-end developers
    //  integrating with the blueprint API.)
    Model.findOne(pk).populateAll().exec(function found(err, matchingRecord) {

      if (err) return res.serverError(err);
      if (!matchingRecord) return res.notFound();

      // dont change user password in user edit
      values.password = matchingRecord.password;

      Model.update(pk, values).exec(function updated(err, records) {

        // Differentiate between waterline-originated validation errors
        // and serious underlying issues. Respond with badRequest if a
        // validation error is encountered, w/ validation info.
        if (err) return res.negotiate(err);


        // Because this should only update a single record and update
        // returns an array, just use the first item.  If more than one
        // record was returned, something is amiss.
        if (!records || !records.length || records.length > 1) {
          req._sails.log.warn(
          util.format('Unexpected output from `%s.update`.', Model.globalId)
          );
        }

        var updatedRecord = records[0];

        // Do a final query to populate the associations of the record.
        //
        // (Note: again, this extra query could be eliminated, but it is
        //  included by default to provide a better interface for integrating
        //  front-end developers.)
        /*
        var Q = Model.findOne(updatedRecord[Model.primaryKey]);
        Q = actionUtil.populateEach(Q, req);
        Q.exec(function foundAgain(err, populatedRecord) {
          if (err) return res.serverError(err);
          if (!populatedRecord) return res.serverError('Could not find record after updating!');
          console.warn('populated', populatedRecord);
          res.ok(populatedRecord);
        }); // </foundAgain>
        */

        res.ok(updatedRecord);
      });// </updated>
    }); // </found>
  },

  // getter for current logged in user
  current: function (req, res, next) {
    if(req.isAuthenticated && req.isAuthenticated() ){

      // TODO change to join after waterline join suport is ready to use
      // if has a avatar get it after send
      if(req.user.avatarId  && !req.user.avatar){
        Images.findOneById(req.user.avatarId).exec(function(err, image) {
          req.user.avatar = image;
          respond();
        });
      }else{
        respond();
      }


    }else{
      res.send({user: {}});
    }

    function respond(){
      res.send({user: req.user});
    }
  },

  getAvatar: function (req, res, next) {
    var id = req.param('id');
    var defaultAvatarPath = 'assets/imgs/avatars/user-avatar.png';

    if(id){
      User.findOneById(id).exec(function(err, user){
        if(err){
          sails.error(err);
          return res.send(500,{'error':err});
        }else if(user && user.avatarId){
          Images.findOneById(user.avatarId).exec(function(err, image) {
            if (err) {
                console.log('Error on get image from BD: ',err );
                res.send(404);
            } else {

              // TODO change to image upload path
              var path = 'uploads/' + image.name;

              fs.readFile(path,function (err, contents) {

                if (err){
                  sails.log.error(err);
                  return res.send(404);
                }else{
                  res.contentType('image/png');
                  res.send(contents);
                }

              });
            }
          });
        }else{
          fs.readFile(defaultAvatarPath,function (err, contents) {
            if(err){
              sails.log.error('Error on get avatar',err);
              return res.send(404);
            }

            res.contentType('image/png');
            res.send(contents);
          });
        }
      });
    } else {
      return next();
    }
  },

  changeAvatar: function (req, res, next) {
    // TODO validate req.files.files
    var avatarFile = {};

    req.file('file').upload(function (err, files) {
      if (err) return res.serverError(err);

      avatarFile = files[0];
      //temporary file folder
      avatarFile.path = '.tmp/uploads/' + files[0].filename;

      Images.upload(files[0], function(err){
        if(err){
          res.send(
            {
              "files":[],
              "error": err
            }
          );
        } else {
          saveImage();
        }

      });
    });

    function saveImage(file){

      var uploadedFile = {};

      uploadedFile.name = avatarFile.newName;
      uploadedFile.originalFilename = avatarFile.originalFilename;
      uploadedFile.size = avatarFile.size;
      uploadedFile.extension = avatarFile.extension;

      // TODO check if are better get mime direct from file
      //uploadedFile.mime = req.files.files.headers['content-type'];
      uploadedFile.creator = req.user.id;

      Images.create(uploadedFile).exec(function(error, salvedFile) {
        if (error) {
          // TODO delete file if ocurs errror here
          console.log(error);
          res.send(500, {error: res.i18n("DB Error") });
        } else {
          //console.log('salved File:',salvedFile);
          salvedFile.thumbnailUrl = 'http://localhost:1333/images/avatars/user-avatar.png';
          salvedFile.url = 'http://localhost:1333/images/avatars/user-avatar.png';
          salvedFile.deleteUrl = '/files/' + salvedFile.id;
          salvedFile.deleteType = 'DELETE';
          console.log(salvedFile);
          saveAvatar(salvedFile);

        }
      });
    }

    function saveAvatar(salvedFile){
      // Lookup a user

      console.log('New avatar to user:',req.user, salvedFile.id);

      req.user.avatarId = salvedFile.id;

      User.update(
        {id: req.user.id},
        {avatarId: salvedFile.id}
      ).exec(function afterwards(err,updated){

        if(err){
          return res.send(500, {err: res.i18n("Error on user avatar save") });
        }

        res.send({
          "user": req.user,
          "avatar": salvedFile
        });

      });

    }
  },

  forgotPasswordForm: function (req, res, next) {
    res.view();
  },

  /**
   * Get contacts from user with uid
   * TODO add suport to contacts in we
   */
  getContactsName: function(req, res){

    var userId = req.param('id');

    // TODO find only user id contacts
    User.find()
    .limit(25)
    .sort('createdAt ASC')
    .exec(function(err, users) {

      // Error handling
      if (err) {
        return console.log(err);

      // Found multiple users!
      }

      var userNames = [];
      async.each(users,
        function(user, next){
          userNames.push({
            id: user.id,
            model: 'user',
            text: user.username
          });
          next();
        },function(){
          res.send(userNames);
        }
      );
    });
  }
};
