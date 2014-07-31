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

      res.send({
        group: matchingRecords
      });

    });
  }
};
