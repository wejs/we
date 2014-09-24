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
};
