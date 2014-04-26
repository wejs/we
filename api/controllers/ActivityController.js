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

      async.forEachSeries(activities, activityIterator, sendResponse);

      function activityIterator(activity, callback ){
        Users.findOneById(activity.actor)
        .exec(function(err, dbActor) {
          if(err){
            sails.log.error('ActivityController:index: error on get actors: ',err);
            callback(err);
          }
          activity.actor = dbActor.toJSON();

          // is are a post activity get the target post
          if( activity.verb == 'post'){
            Post.findOneById(activity.target_id).exec(function(err, post){
              if(err){
                sails.log.error('ActiviryController:index: erros on get post from activity: ',activity, err)
                return callback(err);
              }

              // if dont post is not found return a empty object
              if(!post){
                activity.target = {};
                return callback();
              }

              activity.title = res.i18n(
                '%s created the %s %s',
                dbActor.name,
                activity.verb,
                '<a href="/post/'+post.id+'">'+post.text
              );

              activity.target = post;
              // set some Activity streams values
              activity.target.displayName = post.text;

              callback();

            });
          }else{
            callback();
          }
        });

      }

      function sendResponse(){
        res.send({
          items : activities
        });
      }

    });

  }
};
