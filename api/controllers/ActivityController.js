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
    .populate('actor')
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

        if(i >= activitiesLength){
          res.send({
            items : activities
          });
        }

      });

    });

  }
};
