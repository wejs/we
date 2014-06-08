
define(['we', 'ember'], function (we) {
  App.WeCommentFormComponent = Ember.Component.extend({
    body: '',
    post: null,
    tagName: 'form',
    actions: {
      sendComment: function(){
        var _this = this;
        var commentNew = {};
        commentNew.body = this.get('body');
        var store = this.get('store');
        var post = this.get('post');

        // set some default values
        commentNew.createdAt = new Date();
        commentNew.updatedAt = commentNew.createdAt;

        // get post from store or server
        store.find('user', we.authenticatedUser.id)
        .then(function(user){

          // create new comment on store
          var comment = store.createRecord('comment', commentNew);

          comment.setProperties({
            'creator': user,
            'post': post
          });

          // save comment
          comment.save().then(function(){
            // close and clear sharebox form inputs
            _this.setProperties({
              'body': ''
            });
          });

        });
      }
    }
  });
});