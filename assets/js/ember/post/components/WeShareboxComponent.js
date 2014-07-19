
define(['we', 'ember', 'select2', 'jquery'], function (we) {

  App.WeShareboxComponent = Ember.Component.extend(
    App.LoggedInMixin,
    App.PostMecanismMixin,
  {
    shareboxClass: 'small',
    postNew: {
      body: ''
    },
    isOpen: false,
    toIdtagsManagerElement: 'input[name="toIds"]',
    toIdtagsManagerContainer: '.toIdsSelectedDisplay',
    bodyPlaceholder: we.i18n("What is happening?"),

    imageUploadUrl: '/api/v1/images',

    shareImages: false,

    sharedWith: [],
    sharedIn: [],

    videos: [],
    links: [],

    group: null,
    enableShareInput: true,

    files: [],
    filesNew: {},
    init: function init(){
      this._super();
      var _this = this;
      var store = this.get('store');

      if(!store) console.error('Store is required for WeShareboxComponent');

      if(this.get('group')){
        this.set('enableShareInput', false);
        return;
      }
    },
    willDestroyElement: function willDestroyElement(){

    },
    filesDidChange: (function() {
      var _this = this;
      var files = _this.get('filesNew');
      _this.get('files').pushObject(files[0]);
    }).observes('filesNew'),
    emptyData: function(){
      this.setProperties({
        'postNew.body': '',
        'isOpen': false,
        'shareboxClass': 'small',
        'shareImages': false,
        'files': [],
        'sharedIn': [],
        'sharedWith': [],
        'images': [],
        'videos': [],
        'links':[]
      });
    },
    actions: {
      openBox: function openBox(){
        this.setProperties({
          'isOpen': true,
          'shareboxClass': 'normal'
        });
      },
      closeBox: function closeBox(){
        this.setProperties({
          'isOpen': false,
          'shareboxClass': 'small'
        });
      },
      openShareImage: function openShareImage(){
        this.set('shareImages', true);
      },
      submit: function submit(){
        var _this = this;
        var postNew = this.get('postNew');
        var element = this.$(".select2-element");
        var store = this.get('store');

        var sharedIn = this.get('sharedIn');
        var sharedWith = this.get('sharedWith');

        var group = this.get('group');

        if(group){
          sharedIn.push(group.id);
        }

        postNew.createdAt = new Date();
        postNew.updatedAt = new Date();
        postNew.videos = _this.get('videos');
        postNew.links = _this.get('links');
        postNew.sharedWith = sharedWith;
        postNew.sharedIn = sharedIn;

        store.find('user', we.authenticatedUser.id)
        .then(function(user){

          // create new post on store
          var post = store.createRecord('post', postNew);

          post.setProperties({
            'creator': user
          });

          var files = _this.get('files');
          var uploadUrl = _this.get('imageUploadUrl');

          // upload the images
          uploadFiles(files, uploadUrl, function(err, data){
            // TODO
            console.warn('TODO! add image to post',data);

            post.save().then(function(){
              // empty selectd tags
              element.select2('data', null);
              // close and clear sharebox form inputs
              _this.emptyData();
            });
          });
        });
      }
    }
  });

  function uploadFiles(files, uploadUrl, callback){
    var uploader = Ember.Uploader.create({
      url: uploadUrl,
      type: 'POST',
      paramName: 'files'
    });

    if (!Ember.isEmpty(files)) {
      var promisseUpload = uploader.upload(files);
      promisseUpload.then(function(data) {
        // Handle success
        callback(null, data);
      }, function(error) {
        // Handle failure
        callback(error,null);
      });
    }else{
      callback(null,[]);
    }
  }

  // function storeAndGetImageIds(store, images){
  //   var imagesIds = [];
  //   for (var i = 0; i < images.length; i++) {
  //     store.push('images',images[i]);
  //     imagesIds.push(images[i].id);
  //   }

  //   return imagesIds;
  // }

});