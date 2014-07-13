
define(['we', 'ember'], function (we) {
  App.WeCommentFormComponent = Ember.Component.extend(App.LoggedInMixin,{
    body: '',
    post: null,
    tagName: 'form',
    isOpenComentTextarea: false,
    commentBodyClass: function(){
      if(this.get('isOpenComentTextarea')){
        return 'comment-body open';
      }else{
        return 'comment-body closed';
      }
    }.property('isOpenComentTextarea'),
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

          // close and clear sharebox form inputs
          _this.setProperties({
            'body': '',
            'isOpenComentTextarea': false
          });

          // save comment
          comment.save();

        });
      },
      openComentTextarea: function(){
        this.set('isOpenComentTextarea', true);
      },
      closeComentTextarea: function(){
        this.set('isOpenComentTextarea', false);
      }
    }
  });
});