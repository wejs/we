/**
 * WembedController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
// var wn = require('wembed-nodejs-consumer');
// var path = require('path');
// var uuid = require('node-uuid');
// var mkdirp = require('mkdirp');
//
var util = require('util');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');


module.exports = {
  findOne: function findOneRecord (req, res) {

    var Model = Wembed;
    var pk = actionUtil.requirePk(req);
    var modelName = 'wembed';

    var query = Model.findOne(pk);
    //query = actionUtil.populateEach(query, req.options);
    query.exec(function found(err, matchingRecord) {
      if (err) return res.serverError(err);
      if(!matchingRecord) return res.notFound('No record found with the specified `id`.');
      /*
      if (sails.hooks.pubsub && req.isSocket) {
        Model.subscribe(req, matchingRecord);
        actionUtil.subscribeDeep(req, matchingRecord);
      }
      */


      res.send({wembed: matchingRecord});
    });

  }
  // /**
  //  * Save one Wembed
  //  * @todo  add suport to select wembed thumbnail
  //  */
  // create: function createRecord(req, res){

  //   var wembedUrl = req.param('url');

  //   var userId = req.user.id;

  //   wn.getDataWithUrl(wembedUrl, function(err, pageData, response) {
  //     if(err){
  //       sails.log.error('Error on get Wembed',wembedUrl, err);
  //       return res.serverError('Error on get Wembed');
  //     }
  //     if(response.statusCode === 404){
  //       sails.log.error('Page not found',wembedUrl);
  //       return res.notFound('Page not found');
  //     }

  //     if(response.statusCode !== 200) {
  //       sails.log.error('Error on get Wembed',wembedUrl, response.statusCode);
  //       return res.serverError('Error on get Wembed');
  //     }

  //     pageData.wembedId = pageData.id;
  //     pageData.creator = userId;
  //     delete pageData.id;
  //     delete pageData.createdAt;
  //     delete pageData.updatedAt;


  //     if(!pageData.images){
  //       return createAndSendResponse(pageData);
  //     }

  //     var mime = pageData.images[0].mime;

  //     var thumbnailToPath = path.resolve(sails.config.upload.wembedImageFolder + '/' + pageData.domain );

  //     mkdirp(thumbnailToPath,function(){

  //       pageData.thumbnail = uuid.v1();

  //       thumbnailToPath = thumbnailToPath + '/' + pageData.thumbnail;

  //       pageData.thumbnailMime = mime;

  //       wn.downloadPageImage(
  //         pageData.images.url ,
  //         thumbnailToPath,
  //         sails.config.wejs.wembedProvider,
  //         function(err)
  //       {
  //         if(err) sails.log.error('Error on upload wembed image', err);

  //         createAndSendResponse(pageData);
  //       });
  //     })

  //     function createAndSendResponse(pageData){
  //       Wembed.create(pageData).exec(function created (err, newInstance) {
  //         // Differentiate between waterline-originated validation errors
  //         // and serious underlying issues. Respond with badRequest if a
  //         // validation error is encountered, w/ validation info.
  //         if (err) return res.negotiate(err);

  //         res.status(201);
  //         res.ok({wembed: newInstance});
  //       });
  //     }
  //   });
  // }
};
