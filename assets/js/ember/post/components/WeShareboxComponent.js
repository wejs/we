
define(['we', 'ember', 'select2', 'jquery'], function (we) {

  App.PostShareboxController = Ember.ObjectController.extend(
    App.LoggedInMixin,
    App.PostMecanismMixin,
  {
    shareboxClass: 'small',
    enableShareInput: true,
    isOpen: false,
    toIdtagsManagerElement: 'input[name="toIds"]',
    toIdtagsManagerContainer: '.toIdsSelectedDisplay',
    bodyPlaceholder: we.i18n("What is happening?"),

    imageUploadUrl: '/api/v1/images',

    shareImages: false,

    filesNew: {},
    willDestroyElement: function willDestroyElement(){

    },
    init: function(){
      this._super();

      if(this.parentController.get('group')){
        this.set('enableShareInput', false);
      }

    },
    filesDidChange: (function() {
      var _this = this;
      var files = _this.get('filesNew');
      _this.get('files').pushObject(files[0]);
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
      closeBox: function closeBox(){
        this.emptyData();
      },
      openShareImage: function openShareImage(){
        this.set('shareImages', true);
      },
      submit: function submit(){
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

          var files = _this.get('files');
          var uploadUrl = _this.get('imageUploadUrl');

          // upload the images
          uploadFiles(files, uploadUrl, function(err, data){
            // TODO
            console.warn('TODO! add image to post',data);

            post.save().then(function(){
              // empty selectd tags
              //element.select2('data', null);
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