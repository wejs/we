/**
 * PubsubController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  subscribe: function(req, res) {
    // valid the request
    // TODO move to one police
    if ( !req.isSocket ) {
      return res.badRequest('Only can subscribe in socket.io');
    }

    var modelName = req.param('modelName');
    var ids = req.param('ids');

    if ( !ids || !modelName ) {
      return res.badRequest('ids and modelName params is required');
    }

    if ( !_.isArray(ids) || !_.isString(modelName)  ) {
      return res.badRequest('ids param need be a array or modelName need be a string');
    }

    var Model = sails.models[modelName];
    if (!Model) {
      return res.badRequest('Model not found');
    }

    if (ids.length || ids.length > 100 ) {
      return res.badRequest('Model not found');
    }
    // -- end valid the request
    var query = {};
    if ( modelName === 'user') {
      query = {
        id: ids
      };
    } else {
      query = {
        idInProvider: ids
      };
    }

    Model.find(query)
    .exec(function (err, records) {
      if (err) {
        sails.log.error('Error on get records to update')
        return res.serverError();
      }
      if (!records) {
        return res.notFound();
      }

      sails.log.warn('subscribo', records);
      // use sails.js build in PubSub feature
      Model.subscribe (req, records);
      // respond with 200 for success
      req.send();
    });
  },

  unsubscribe: function(req, res) {
    if ( !req.isSocket ) {
      return res.badRequest('Only can unsubscribe in socket.io');
    }



  }
}
