/**
 * GroupController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var util = require('util');
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');


module.exports = {
  list: function findRecords (req, res) {
    // Look up the model
    var Model = Group;

    // Lookup for records that match the specified criteria
    var query = Model.find()
    .where( actionUtil.parseCriteria(req) )
    .limit( actionUtil.parseLimit(req) )
    .skip( actionUtil.parseSkip(req) )
    .sort( actionUtil.parseSort(req) );
    query.exec(function found(err, matchingRecords) {
      if (err){ return res.serverError(err); }

      res.send({
        group: matchingRecords
      });

    });
  },

  findOne: function findOneRecord (req, res) {

    var Model = actionUtil.parseModel(req);
    var pk = actionUtil.requirePk(req);

    var query = Model.findOne(pk);
    //query = actionUtil.populateEach(query, req.options);
    query.exec(function found(err, matchingRecord) {
      if (err) { return res.serverError(err); }
      if(!matchingRecord) { return res.notFound('No record found with the specified `id`.'); }
      /*
      if (sails.hooks.pubsub && req.isSocket) {
        Model.subscribe(req, matchingRecord);
        actionUtil.subscribeDeep(req, matchingRecord);
      }
      */
      res.ok({
        group: matchingRecord
      });
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
      if (err) { return res.negotiate(err); }

      res.status(201);
      res.send({ group : newInstance });
    });
  },


  populate: function expand(req, res) {

    var Model = actionUtil.parseModel(req);
    var relation = req.options.alias;
    if (!relation || !Model) return res.serverError();

    // Allow customizable blacklist for params.
    req.options.criteria = req.options.criteria || {};
    req.options.criteria.blacklist = req.options.criteria.blacklist || ['limit', 'skip', 'sort', 'id', 'parentid'];

    var parentPk = req.param('parentid');

    // Determine whether to populate using a criteria, or the
    // specified primary key of the child record, or with no
    // filter at all.
    var childPk = actionUtil.parsePk(req);
    var where = childPk ? [childPk] : actionUtil.parseCriteria(req);

    Model
      .findOne(parentPk)
      .populate(relation, {
        where: where,
        skip: actionUtil.parseSkip(req),
        limit: actionUtil.parseLimit(req),
        sort: actionUtil.parseSort(req)
      })
      .exec(function found(err, matchingRecord) {
        if (err) return res.serverError(err);
        if (!matchingRecord)
          return res.notFound('No record found with the specified id.');
        if (!matchingRecord[relation])
          return res.notFound(util.format('Specified record (%s) is missing relation `%s`', parentPk, relation));

        // Subcribe to instance, if relevant
        // TODO: only subscribe to populated attribute- not the entire model
        if (sails.hooks.pubsub && req.isSocket) {
          Model.subscribe(req, matchingRecord);
          actionUtil.subscribeDeep(req, matchingRecord);
        }

        // IF is post get its relations
        if(relation === 'posts'){

          async.map(matchingRecord.posts,function populateSubModel(post, nextSubModel){

            Post.loadPostImageAndComments(post, nextSubModel)

          }, function donePopulatePost(err, postsPopulated){
            if(err) sails.log.error(err);
            return res.sen(postsPopulated);
          });

        } else {
          return res.ok(matchingRecord[relation]);
        }

      });
  }

};
