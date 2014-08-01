
define(['we', 'ember', 'select2'], function (we) {

  App.PostShareboxController = Ember.ObjectController.extend(
    App.LoggedInMixin,
    App.PostMecanismMixin,
  {
    shareboxClass: function(){
      if(this.get('isOpen')) return 'small';
      return 'small';
    }.property('isOpen'),

    bodyPlaceholder: we.i18n("What is happening?"),

    imageUploadUrl: '/api/v1/images',
    // if are selection attach options
    // used to show or hide attach options buttons selector
    selectingAttachOption: function(){
      if(this.get('files.length') || this.get('videos.length') ) return false;
      return true;
    }.property('files.length','videos.length'),

    images: [],
    // new files object watcher
    filesNew: {},
    isSending: true,

    filesDidChange: (function() {
      var files = this.get('filesNew');
      this.get('files').pushObject(files[0]);
    }).observes('filesNew'),

    emptyData: function(){
      this.setProperties(App.postClean());
    },

    actions: {
      openBox: function openBox(){
        this.setProperties({
          'isOpen': true,
          'shareboxClass': 'normal'
        });
      },
      cancel: function closeBox(){
        this.emptyData();
      },
      submit: function submit(){
        var _this = this;
        this.set('isSending',true);

        var files = _this.get('files');
        var uploadUrl = _this.get('imageUploadUrl');

        // first start image upload
        this.send('uploadImages',files, uploadUrl, function(err){
          _this.send('savePost');
          _this.set('isSending',false);
        });
      },
      /**
       * Save the post on server
       */
      savePost: function savePost(){
        var _this = this;
        var postNew = this.get('model');
        var store = this.get('store');
        var group = this.parentController.get('group');

        if(group){
          postNew.sharedIn = [group.id];
        }

        store.find('user', we.authenticatedUser.id)
        .then(function(user){
          // create new post on store
          var post = store.createRecord('post', postNew);
          post.setProperties({
            'creator': user
          });

          // delete unneed files variable
          delete post.files;
          delete post.filesNew;

          post.save().then(function(){

            // close and clear sharebox form inputs
            _this.emptyData();
            // post send!
          });
        });
      }
    }
  });
});