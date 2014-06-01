
define(['we', 'ember', 'tagmanager', 'typeahead', 'bloodhound'], function (we) {

  App.WeShareboxComponent = Ember.Component.extend({
    shareboxClass: 'small',
    postNew: {
      content: ''
    },
    toIdtagsManagerElement: 'input[name="toIds"]',
    toIdtagsManagerContainer: '.toIdsSelectedDisplay',
    contentPlaceholder: we.i18n("What is happening?"),
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
      if(!element.tagsManager){
        return console.error('jquery.tagsManager Not found on element', element);
      }

      var tagApi = element.tagsManager({
        tagsContainer: _this.get('toIdtagsManagerContainer'),
        tagClass: 'tm-tag-success'
      });

      var contacts = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 1000,
        prefetch: {
          url: '/user/'+userId+'/contacts-name'
        }
      });

      contacts.initialize();

      element.typeahead({
        hint: true,
        highlight: true,
        minLength: 2
      },
      {
        name: 'states',
        displayKey: 'name',
        source: contacts.ttAdapter()
      }).on('typeahead:selected', function (e, d) {
        tagApi.tagsManager("pushTag", d.name);
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
        if( this.get('shareboxClass') != 'normal' ){
          this.set('shareboxClass','normal');
        }
      },
      closeBox: function closeBox(){
        this.set('shareboxClass','small');
      },
      submit: function submit(){
        var postNew = this.get('postNew');
        var element = this.$(this.get('toIdtagsManagerElement')) ;
        console.warn('Submit post',this.get('postNew'), element.tagsManager('tags'));
      }
    }
  });


});