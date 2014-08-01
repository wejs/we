

define(['we','ember'], function (we) {

 App.PostController = Ember.ObjectController.extend(
  App.PostMecanismMixin,
  {
    isEditing: false,
    loadedComments: 4,

    shareInGroups: null,
    shareWithUsers: null,

    metadata: {
      commentCount: 0
    },
    /**
     * Image upload
     * @todo rename vars to image
     */
    filesDidChange: (function() {
      var files = this.get('filesNew');
      this.get('files').pushObject(files[0]);
    }).observes('filesNew'),
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
      var _this = this;
      var comments = this.get('comments');
      var store = this.get('store');

      if(!comments){
        this.set('comments',[]);
        return;
      }
      if(comments.length){
        var commentModels = this.get('store').pushMany('comment',comments);
        this.set('comments', commentModels);
      }

      this.setProperties({
        'metadata': this.get('content._data.meta')
      });
    },
    actions: {
      edit: function() {
        this.set('isEditing', true);
      },
      cancel: function() {
        this.set('isEditing', false);
        // rollback changes
        this.get('model').rollback();
      },
      submit: function(){
        var _this = this;
        // // save the model
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
      },

      newCommentCreated: function(comment){
        this.get('comments').pushObject(comment);

        var commentCount = this.get('metadata.commentCount');
        commentCount++;
        this.set('metadata.commentCount',commentCount);
      },

      showSharedWith: function(){
        console.warn('TODO! show shared with ...', this.get('shareWithUsers'), this.get('shareInGroups'));
      },
      onRemoveSalvedImage: function(){
        console.warn('onRemoveSalvedImage');
      }
    }
  });

});
