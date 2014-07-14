

define(['we','ember'], function (we) {

 App.PostController = Ember.ObjectController.extend({
    isEditing: false,
    loadedComments: 4,
    hasMoreComments: function(){
      console.warn(this.get('content._data.meta.commentCount'), this.loadedComments)
      if(this.get('content._data.meta.commentCount') > this.loadedComments){
        return true;
      }else{
        return false;
      }
    }.property('content._data.meta.commentCount', 'loadedComments'),
    commentCount: function(){
      return this.get('content._data.meta.commentCount');
    }.property('content._data.meta.commentCount'),
    init: function(){
      this._super();

      var comments = this.get('model.comments');
      if(comments.length){
        var commentModels = this.get('store').pushMany('comment',comments);
        this.set('comments', commentModels);
      }


    },
    actions: {
      edit: function() {
        this.set('isEditing', true);
        window.teste = this;
      },
      cancel: function() {
        this.set('isEditing', false);
      },
      save: function(){
        var _this = this;
        var model = _this.get('model');
        // save the model
        _this.get('model').save().then(function(post){
          // updated!
          _this.set('isEditing', false);
        });
      },
      deleteItem: function(){
        var userConfirmation = confirm( we.i18n("Are you sure you want to delete the post?") );
        if (userConfirmation === true) {
          var model = this.get('model');
          model.deleteRecord();
          model.save();
        }
      },
      loadAllComments: function(){
        var _this = this;

        this.store.find('comment',{
          post: this.get('id'),
          limit: 1000
        }).then(function(comments){
          console.warn('comments',comments)
          if(comments){
            _this.setProperties({
              'comments': comments,
              'loadedComments': comments.get('length'),
              'content._data.meta.commentCount': comments.get('length')
            });
          }
        });
      }
    }
  });

});
