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
   * get Follow status for one content
   */
  isFollowIng: function getOneFollowFlag(req, res) {
    var query = {};

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

    FollowFlag.find(query)
    .exec( function(err, records){
      if ( err ) {
        sails.log.error('isFollowIng:FollowFlag.find', query, err);
        return res.serverError();
      }

      if(!records) {
        return res.send({
          followFlag: records,
          meta: {
            count: 0
          }
        });
      }

      FollowFlag.count().where(query)
      .exec(function countCB(err, count) {
        if (err) {
          sails.log.error('isFollowIng:FollowFlag.count', query,err);
          return res.serverError();
        }

        res.send({
          followFlag: records,
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
  isFollowIngMultiple: function getOneFollowFlag(req, res) {
    sails.log.warn('isFollowIngMultiple')
  },

  /**
   * create one follow
   */
  follow: function createFollowFlag(req, res) {
    if (!req.isAuthenticated()) return res.forbidden();

    var modelName = req.param('model');
    var modelId = req.param('modelId');
    var userId = req.user.id;

    if (!modelName || !modelId) {
      sails.log.warn('Model name or modelId not found', modelName, modelId);
      return res.badRequest();
    }

    // check if record exists
    FollowFlag.recordExists(modelName, modelId,function(err, record) {
      if (err || !record) {
        sails.log.error('unFollow:Model type id record dont exist.', modelName, modelId);
        return res.forbidden();
      }

      // check if is following
      FollowFlag.isFollowIng(userId, modelName, modelId)
      .exec(function isFollowIngCB(err, followFlag) {
        if (err) {
          sails.log.error('follow:FollowFlag.isFollowIng:Error on check if user is followIng',modelName, modelId, err);
          return res.serverError(err);
        }

        // is following
        if (followFlag) {
          return res.send({followFlag: followFlag})
        }

        return FollowFlag.create({
          userId: userId,
          model: modelName,
          modelId: modelId
        })
        .exec(function(err, salvedFollowFlag) {
          if (err) {
            sails.log.error('follow:FollowFlag.create:Error on check if user is followIng',modelName, modelId, err);
            return res.serverError(err);
          }

          return res.send({followFlag: salvedFollowFlag})
        })
      })
    })
  },

  unFollow: function deleteFollowFlag(req, res) {
    if (!req.isAuthenticated()) return res.forbidden();

    var modelName = req.param('model');
    var modelId = req.param('modelId');
    var userId = req.user.id;

    if (!modelName || !modelId) {
      sails.log.warn('unFollow:Model name or modelId not found', modelName, modelId);
      return res.badRequest();
    }

    // check if is following
    return FollowFlag.isFollowIng(userId, modelName, modelId)
    .exec(function isFollowIngCB(err, followFlag) {
      if (err) {
        sails.log.error('unFollow:FollowFlag.unFollow:Error on check if user is followIng',modelName, modelId, err);
        return res.serverError(err);
      }

      return FollowFlag.destroy()
      .exec(function unFollowCB(err) {
        if (err) {
          sails.log.error('unFollow:FollowFlag.destroy:Error on delete flag', modelName, modelId, err);
          return res.serverError(err);
        }

        // send a 200 response on success
        return res.send();
      });
    })
  }

};
