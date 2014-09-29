sails.on('we:model:post:afterCreate', function(post){
  // create one activity for this post create
  Activity.create({
    actor: post.creator,
    verb: 'post',
    post: post.id,
    action: 'created'
  }).exec(function(error, activity) {
    // if has one error in activity creation, log it
    if (error) sails.log.error('PostModel:create: error on create Activity: ',error, activity);
  });
});


var activity = {};

module.exports = activity;