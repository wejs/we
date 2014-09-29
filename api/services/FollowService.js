sails.on('we:model:post:afterCreate', function(post){
  // create one activity for this post create
  // follow and auto subscribe creator in its post after create
  Follow.create({
    userId: post.creator,
    model: 'post',
    modelId: post.id
  })
  .exec(function(err) {
    if (err) {
      sails.log.error('Error on create flag for post', post, err);
    }
  });
});

var follow = {};

module.exports = follow;