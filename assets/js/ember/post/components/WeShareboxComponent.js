
define(['we', 'ember', 'select2', 'jquery'], function (we) {

  App.WeShareboxComponent = Ember.Component.extend(App.LoggedInMixin,{
    shareboxClass: 'small',
    postNew: {
      body: ''
    },
    isOpen: false,
    toIdtagsManagerElement: 'input[name="toIds"]',
    toIdtagsManagerContainer: '.toIdsSelectedDisplay',
    bodyPlaceholder: we.i18n("What is happening?"),

    shareImages: false,

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
        'files': []
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

        var sharedIn = [];
        var sharedWith = [];

        var group = this.get('group');
        if(group){
          sharedIn.push(group.id);
        }else{
          var sharedWithObjects = element.select2('data');
          for (var i = 0; i < sharedWithObjects.length; i++) {
            sharedWith.push(sharedWithObjects[i].id );
          }
        }

        store.find('user', we.authenticatedUser.id)
        .then(function(user){

          // TODO change this findMany function to something better
          var map = Ember.ArrayPolyfills.map;
          var promises = map.call(sharedWith, function(id) {
            return store.find('user', id);
          }, this);

          var promisesGroup = map.call(sharedIn, function(id) {
            return store.find('group', id);
          }, this);

          Ember.RSVP.all(promises).then(function(shareWithUsers){
          Ember.RSVP.all(promisesGroup).then(function(shareInGroups){
              // create new post on store
              var post = store.createRecord('post', postNew);

              post.setProperties({
                'creator': user,
                'createdAt': new Date(),
                'updatedAt': new Date()
              });

              post.get('sharedWith').pushObjects(shareWithUsers);
              post.get('sharedIn').pushObjects(shareInGroups);

              // save post
              post.save().then(function(){
                // empty selectd tags
                element.select2('data', null);
                // close and clear sharebox form inputs
                _this.emptyData();

              });
          });
          });

        });
      }
    }
  });


});