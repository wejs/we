/**
 * Helper / utils functions
 */

/**
 * Delete all data from database
 * @param  {function} callbackDoneEmptyDatabase
 */
exports.emptyDatabase = function(callbackDoneEmptyDatabase){
  var modelNames = Object.keys(sails.models);
  async.forEach(modelNames, function (modelName, nextItem){
    sails.models[modelName].destroy(function (err) {
      if(err) return nextItem(err);
      nextItem();
    });
  }, function(err) {
      callbackDoneEmptyDatabase();
  });
};