
define(['we','ember'], function (we) {
  App.WeSelect2Component = Ember.Component.extend({
    tagName: 'input',
    type: 'text',
    classNames: ["select2-element","form-control","input-md","tm-input","tm-input-success"],
    placeholder: "Share with ...",
    shareWithOptions: [],
    didInsertElement:function(){
      var element = this.$();

      if(!element.select2){
        return console.error('jquery.select2 Not found on element', element);
      }

      element.select2({
        placeholder: this.get('placeholder'),
        minimumInputLength: 3,
        multiple: true,
        data: this.get('shareWithOptions'),
        formatResult: function(item){
          return item.text;
        },
        formatSelection: function(item){
          return item.text;
        },
        formatSelectionCssClass: function (item) {
          switch(item.model) {
            case 'user':
              return 'model-user';
              break;
            case 'group':
              return 'model-group';
              break;
          }
          return "";
        },
        dropdownCssClass: "sharebox-dropdown",
        escapeMarkup: function (m) { return m; }
      });
    },
    willDestroyElement: function(){
      this.$().select2("destroy");
    },

    // TODO how to call this functions from outside?
    getSelectedItems: function(){
      return this.$().select2('data');
    },
    empty: function(){
      this.$().select2('data', null);
    }
  });
});