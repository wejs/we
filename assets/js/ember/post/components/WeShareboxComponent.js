
define(['we', 'ember', 'select2', 'jquery'], function (we) {

  App.WeShareboxComponent = Ember.Component.extend({
    shareboxClass: 'small',
    postNew: {
      body: ''
    },
    isOpen: false,
    toIdtagsManagerElement: 'input[name="toIds"]',
    toIdtagsManagerContainer: '.toIdsSelectedDisplay',
    bodyPlaceholder: we.i18n("What is happening?"),
    files: [],
    filesNew: {},
    init: function init(){
      this._super();
      var _this = this;
      var store = this.get('store');

      if(!store) console.error('Store is required for WeShareboxComponent');

    },
    didInsertElement: function didInsertElement() {
      var _this = this;
      var element = this.$(_this.get('toIdtagsManagerElement'));
      var userId = we.authenticatedUser.id;

      if(!userId){
        return console.error('authenticatedUser user id not found',userId);
      }
      if(!element.select2){
        return console.error('jquery.select2 Not found on element', element);
      }

      // we.getShareWithOptions
      // get share with options
      $.ajax({
        type: 'GET',
        url: '/user/'+userId+'/contacts-name',
        cache: false,
        dataType: 'json',
        contentType: 'application/json',
        success: function(data){
          element.select2({
            placeholder: "Share with ...",
            minimumInputLength: 3,
            multiple: true,
            data: data,
            formatResult: function(item){
              //console.warn('formatResult',item);

              return item.text;
            }, // omitted for brevity, see the source of this page
            formatSelection: function(item){
              //console.warn('formatSelection',item);
              return item.text;
            }, // omitted for brevity, see the source of this page
            dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
            escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
          });
        },
        error: function(data){
          console.error('Error on get share with list', data);
        }
      });

    },
    willDestroyElement: function willDestroyElement(){

    },
    filesDidChange: (function() {
      var _this = this;
      var files = _this.get('filesNew');
      _this.get('files').pushObject(files[0]);
    }).observes('filesNew'),

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
      submit: function submit(){
        var _this = this;
        var postNew = this.get('postNew');
        var element = this.$(this.get('toIdtagsManagerElement')) ;
        var store = this.get('store');

        var sharedWith = [];
        var sharedWithObjects = element.select2('data');

        for (var i = 0; i < sharedWithObjects.length; i++) {
          sharedWith.push(sharedWithObjects[i].id );
        }

        store.find('user', we.authenticatedUser.id)
        .then(function(user){

          // TODO change this findMany function to something better
          var map = Ember.ArrayPolyfills.map;
          var promises = map.call(sharedWith, function(id) {
            return store.find('user', id);
          }, this);

          Ember.RSVP.all(promises).then(function(shareWithUsers){
            //store.find('user',{id: sharedWith} )
            //.then(function(shareWithUsers){

              // create new post on store
              var post = store.createRecord('post', postNew);

              post.setProperties({
                'creator': user,
                'createdAt': new Date(),
                'updatedAt': new Date()
              });

              post.get('sharedWith').pushObjects(shareWithUsers);

              // save post
              post.save().then(function(){
                // empty selectd tags
                element.select2('data', null);
                // close and clear sharebox form inputs
                _this.setProperties({
                  'postNew.body': '',
                  'isOpen': false,
                  'shareboxClass': 'small'
                });

              });

            //});

          });

        });
      }
    }
  });


});