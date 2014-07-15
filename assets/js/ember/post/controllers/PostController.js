

define(['we','ember'], function (we) {

 App.PostController = Ember.ObjectController.extend({
    isEditing: false,
    loadedComments: 4,
    metadata: null,

    hasMoreComments: function(){
      if(this.get('metadata.commentCount') > this.loadedComments){
        return true;
      }else{
        return false;
      }
    }.property('metadata.commentCount', 'loadedComments'),
    commentCount: function(){
      return this.get('metadata.commentCount');
    }.property('metadata.commentCount'),


    init: function(){
      this._super();
      var comments = this.get('comments');
      if(!comments){
        this.set('comments',[]);
        return;
      }
      if(comments.length){
        var commentModels = this.get('store').pushMany('comment',comments);
        this.set('comments', commentModels);
      }
      this.set('metadata',this.get('content._data.meta'));
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
          if(comments){
            _this.setProperties({
              'comments': comments,
              'loadedComments': comments.get('length'),
              'metadata.commentCount': comments.get('length')
            });
          }
        });
      }
    }
  });

});
