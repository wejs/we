/**
 * FollowFlagController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  _config: {
    rest: false,
    actions: false
  },

  /**
   * get Flag status for one content
   */
  getModelFlags: function getOneFlag(req, res) {
    var query = {};

    var flagType = req.param('flagType');
    var model = req.param('model');
    var modelId = req.param('modelId');
    var userId = req.param('userId');

    // if dont has a user id param try to get it from
    // authenticated user
    if (!userId) {
      if (!req.isAuthenticated()) {
        return res.badRequest();
      }
      userId = req.user.id;
    }

    if (!model) {
      sails.log.warn('Model name not found', model, modelId);
      return res.badRequest();
    }

    query.model = model;
    if (modelId) query.modelId = modelId;
    if (userId) query.userId = userId;
    if (flagType) query.flagType = flagType;

    Flag.find(query)
    .exec( function(err, records){
      if ( err ) {
        sails.log.error('isFlagged:Flag.find', query, err);
        return res.serverError();
      }

      if(!records) {
        return res.send({
          flag: records,
          meta: {
            count: 0
          }
        });
      }

      delete query.userId;

      Flag.count().where(query)
      .exec(function countCB(err, count) {
        if (err) {
          sails.log.error('isFlagged:Flag.count', query,err);
          return res.serverError();
        }

        res.send({
          flag: records,
          meta: {
            count: count
          }
        });

      });
    });
  },

  /**
   * get Follow status for one content
   */
  isFlaggedMultiple: function getOneFollowFlag(req, res) {
    sails.log.warn('TODO! isFlaggedMultiple');
  },

  /**
   * create one flag
   */
  flag: function createFlag(req, res) {
    if (!req.isAuthenticated()) return res.forbidden();

    var flagType = req.param('flagType');
    var modelName = req.param('model');
    var modelId = req.param('modelId');
    var userId = req.user.id;

    if (!modelName || !modelId) {
      sails.log.warn('Model name or modelId not found', modelName, modelId);
      return res.badRequest();
    }

    if(!flagType) {
      sails.log.warn('Cant flag without flagType', modelName, modelId);
      return res.badRequest();
    }

    // check if record exists
    Flag.recordExists(modelName, modelId,function(err, record) {
      if (err || !record) {
        sails.log.error('unFollow:Model type id record dont exist.', modelName, modelId);
        return res.forbidden();
      }

      // check if is flagged
      Flag.isFlagged(flagType ,userId, modelName, modelId)
      .exec(function(err, flag) {
        if (err) {
          sails.log.error('flag:Flag.isFlagged:Error on check if user is flagged',modelName, modelId, err);
          return res.serverError(err);
        }

        // is following
        if (flag) {
          return res.send({flag: flag})
        }

        Flag.create({
          flagType: flagType,
          userId: userId,
          model: modelName,
          modelId: modelId
        })
        .exec(function(err, salvedFlag) {
          if (err) {
            sails.log.error('flag:Flag.create:Error on check if user is Flagged',modelName, modelId, err);
            return res.serverError(err);
          }

          // send the change to others user connected devices
          var socketRoomName = 'user_' + userId;
          sails.io.sockets.in(socketRoomName).emit(
            'flag:flag', salvedFlag
          );

          return res.send({flag: salvedFlag})
        })
      })
    })
  },

  unFlag: function deleteFlag(req, res) {
    if (!req.isAuthenticated()) return res.forbidden();

    var modelName = req.param('model');
    var modelId = req.param('modelId');
    var userId = req.user.id;
    var flagType = req.param('flagType');

    if (!modelName || !modelId) {
      sails.log.warn('unFlag:Model name or modelId not found', modelName, modelId);
      return res.badRequest();
    }

    if(!flagType) {
      sails.log.warn('Cant flag without flagType', modelName, modelId);
      return res.badRequest();
    }

    // check if is following
    return Flag.isFlagged(flagType, userId, modelName, modelId)
    .exec(function isFlaggedCB (err, flag) {
      if (err) {
        sails.log.error('unFlag:Flag.unFlag:Error on check if user is isFlagged',modelName, modelId, err);
        return res.serverError(err);
      }

      if( !flag ) {
        return res.send();
      }
      return Flag.destroy({id: flag.id})
      .exec(function (err) {
        if (err) {
          sails.log.error('unFlag:Flag.destroy:Error on delete flag', modelName, modelId, err);
          return res.serverError(err);
        }

        // send the change to others user connected devices
        var socketRoomName = 'user_' + userId;
        sails.io.sockets.in(socketRoomName).emit(
          'flag:unFlag', {
            flagType: flag.flagType,
            id: flag.id
          }
        );

        // send a 200 response on success
        return res.send();
      });
    })
  }

};
