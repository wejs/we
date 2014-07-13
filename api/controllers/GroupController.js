/**
 * GroupController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var util = require('util');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');



module.exports = {
	index: function findRecords (req, res) {
    // Look up the model
    var Model = Group;

    var user_id = null;
    if(req.user && req.user.id){
      user_id = req.user.id;
    }

    // Lookup for records that match the specified criteria
    var query = Model.find()
    .where( actionUtil.parseCriteria(req) )
    .limit( actionUtil.parseLimit(req) )
    .skip( actionUtil.parseSkip(req) )
    .sort( actionUtil.parseSort(req) );
    query.exec(function found(err, matchingRecords) {
      if (err) return res.serverError(err);

      async.each(matchingRecords, function(matchingRecord, done){

        sails.log.warn('matchingRecords',matchingRecord);

        done();
      }, function(err){
        if(err) return res.send(500,err);

        sails.log.warn('done');
        res.ok(matchingRecords);
      });

    });
  },

  findOne: function findOneRecord (req, res) {

    var Model = actionUtil.parseModel(req);
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
      res.ok(matchingRecord);
    });
  },

  create: function createRecord (req, res) {

    var Model = Group;

    // Create data object (monolithic combination of all parameters)
    // Omit the blacklisted params (like JSONP callback param, etc.)
    var data = actionUtil.parseValues(req);

    if(req.user && req.user.id){
      data.creator = req.user.id;
    }

    // Create new instance of model using data from params
    Model.create(data).exec(function created (err, newInstance) {
      if (err) return res.negotiate(err);

      res.status(201);
      res.ok(newInstance.toJSON());
    });
  }

};
