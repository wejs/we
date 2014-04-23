/**
 * ActivityController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function (req,res) {

    Activity.find({})
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

      var activitiesLength = activities.length-1;
      activities.forEach(function(activity, i){

        if(activity.actor){
          Users.findOneById(activity.actor)
          .exec(function(err, dbActor) {
            if(err){
              sails.log.error('ActivityController:index: error on get actors: ',err);
            }
            activities[i].actor = dbActor.toJSON();

            activities[i].title = res.i18n(
              '%s created the %s %s',
              dbActor.name,
              activities[i].verb,
              activities[i].title
            );

            // send request in last array item
            if(i >= activitiesLength){
              sendResponse(activities);
            }
          });
        }
      });

      function sendResponse(activities){
        res.send({
          items : activities
        });
      }

    });

  }
};
