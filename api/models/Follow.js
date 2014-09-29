/**
 * Follow
 *
 * @module      :: Model
 * @description :: Flag how store things how users are following
 */

module.exports = {
  schema: true,
  attributes: {
    /**
     * creator user id
     */
    userId: {
      type: 'string',
      required: true
    },

    /**
     * model name ex.: post
     */
    model: {
      type: 'string',
      required: true
    },

    /**
     * mode id ex.: post.id
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
  isFollowing: function (userId, modelName, modelId){
    return Follow.findOne()
    .where({
      userId: userId,
      model: modelName,
      modelId: modelId
    });
  },

  /**
   * Check if one record or model type exists and returns it on callback
   */
  recordExists: function (modelName, modelId, cb) {
    var sailsModel = sails.models[modelName];
    if(!sailsModel) {
      return cb('Model type dont exist.');
    }

    // TODO add suport to check if user exists in we oauth2
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
  },

  getUsersFollowing: function(modelName, modelId) {
    return Follow.find()
    .where({
      model: modelName,
      modelId: modelId
    });
  }
}
