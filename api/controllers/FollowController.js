/**
 * FollowController.js
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
   * get Follow status for one model
   */
  isFollowing: function isFollowing(req, res) {
    if (!req.isAuthenticated()) return res.forbidden();

    var query = {};

    var model = req.param('model');
    var modelId = req.param('modelId');
    var userId = req.user.id;

    if (!model) {
      sails.log.warn('Model name not found', model, modelId);
      return res.badRequest();
    }

    query.model = model;
    if (modelId) query.modelId = modelId;
    if (userId) query.userId = userId;

    Follow.find(query)
    .exec( function(err, records){
      if ( err ) {
        sails.log.error('isFlagged:Flag.find', query, err);
        return res.serverError();
      }

      res.send({
        follow: records
      });

    });
  },

  /**
   * Follow something
   */
  follow: function createFollow(req, res) {
    if (!req.isAuthenticated()) return res.forbidden();

    var modelName = req.param('model');
    var modelId = req.param('modelId');
    var userId = req.user.id;

    if (!modelName || !modelId) {
      sails.log.warn('Model name or modelId not found', modelName, modelId);
      return res.badRequest();
    }

    // check if record exists
    Follow.recordExists(modelName, modelId,function(err, record) {
      if (err || !record) {
        sails.log.error('unFollow:Model type id record dont exist.', modelName, modelId);
        return res.forbidden();
      }

      // check if is following
      Follow.isFollowing(userId, modelName, modelId)
      .exec(function(err, follow) {
        if (err) {
          sails.log.error('follow:Follow.isFollowing:Error on check if user is following',modelName, modelId, err);
          return res.serverError(err);
        }

        // is following
        if (follow) {
          return res.send({follow: follow})
        }

        Follow.create({
          userId: userId,
          model: modelName,
          modelId: modelId
        })
        .exec(function(err, salvedFollow) {
          if (err) {
            sails.log.error('follow:Follow.create:Error on check if user is following',modelName, modelId, err);
            return res.serverError(err);
          }

          // send the change to others user connected devices
          var socketRoomName = 'user_' + userId;
          sails.io.sockets.in(socketRoomName).emit(
            'follow:follow', salvedFollow
          );

          return res.send({follow: salvedFollow})
        })
      })
    })
  },

  unFollow: function deleteFollow(req, res) {
    if (!req.isAuthenticated()) return res.forbidden();

    var modelName = req.param('model');
    var modelId = req.param('modelId');
    var userId = req.user.id;

    if (!modelName || !modelId) {
      sails.log.warn('unFollow:Model name or modelId not found', modelName, modelId);
      return res.badRequest();
    }

    // check if is following
    return Follow.isFollowing(userId, modelName, modelId)
    .exec(function (err, follow) {
      if (err) {
        sails.log.error('unFollow:Follow.isFollowing:Error on check if user is isFollowing',modelName, modelId, err);
        return res.serverError(err);
      }

      if( !follow ) {
        return res.send();
      }
      return Follow.destroy({id: follow.id})
      .exec(function (err) {
        if (err) {
          sails.log.error('unFollow:Follow.destroy:Error on delete follow', modelName, modelId, err);
          return res.serverError(err);
        }

        // send the change to others user connected devices
        var socketRoomName = 'user_' + userId;
        sails.io.sockets.in(socketRoomName).emit(
          'follow:unFollow', {
            flagType: follow.flagType,
            id: follow.id
          }
        );

        // send a 200 response on success
        return res.send();
      });
    })
  }

};
