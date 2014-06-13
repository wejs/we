/**
 * ActivityController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function (req,res) {
    var queryParams = {};

    if(req.user && req.user.id){
      queryParams = {
        actor: {
          $ne: req.user.id
        }
      };
    }

    Activity.find(queryParams)
    .limit(5)
    .sort('updatedAt DESC')
    .exec(function(err, activities) {

      if (err) {
        // TODO
        return console.log(err);
      }

      if(!activities.length){
        return res.send({
          items : []
        });
      }

      async.forEachSeries(activities, activityIterator, sendResponse);

      function activityIterator(activity, callback ){
        callback();
        //Activity.fetchData(activity, callback);
      }

      function sendResponse(){
        res.send(activities);
      }

    });

  }
};
