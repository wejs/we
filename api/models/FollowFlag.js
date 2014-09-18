/**
 * FollowFlag
 *
 * @module      :: Model
 * @description :: Flag how store things how users are following
 */

module.exports = {
  schema: true,
  attributes: {

    /**
     * Follower user id
     */
    userId: {
      type: 'string',
      required: true
    },

    /**
     * Followed mode id ex.: post
     */
    model: {
      type: 'string',
      required: true
    },

    /**
     * Followed mode id ex.: post.id
     */
    modelId: {
      type: 'string',
      required: true
    }
  },

  /**
   * Get query to check if user is following
   *
   * @return {object} waterline findOne query object
   */
  isFollowIng: function checkIfisFollowIngInDB(userId, modelName, modelId){
    return FollowFlag.findOne()
    .where({
      userId: userId,
      model: modelName,
      modelId: modelId
    });
  },

  /**
   * Check if one record or model type exists and returns it on callback
   */
  recordExists: function checkIfRecordExists(modelName, modelId, cb){
    var sailsModel = sails.models[modelName];
    if(!sailsModel) {
      return cb('Model type dont exist.');
    }

    if(modelName === 'user') {
      // user has one external id diferent from db id
      return sailsModel.findOne({
        idInProvider: modelId
      })
      .exec(cb);
    }

    sailsModel.findOne({
      id: modelId
    })
    .exec(cb);
  }
}
