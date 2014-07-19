
define(['we','async', 'ember'], function (we,async) {
  App.WeSelect2Component = Ember.Component.extend({
    tagName: 'input',
    type: 'text',
    classNames: ["select2-element","form-control","input-md","tm-input","tm-input-success"],
    placeholder: "Share with ...",
    shareWithOptions: [],
    chageEventName: 'onChangeSelect2Data',
    // component events
    didInsertElement:function(){
      var element = this.$();
      var _this = this;

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
            case 'group':
              return 'model-group';
          }
          return "";
        },
        dropdownCssClass: "sharebox-dropdown",
        escapeMarkup: function (m) { return m; }
      });

      element.on("change", function(e) {
        _this.sendAction('chageEventName', e);
      });

      // fetch and set preselected values
      getSelectedItemsFromSharedWith(this.get('shareWithUsers'), this.get('shareInGroups'), function(selectedItems){
        element.select2('data', selectedItems);
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

  /**
   *  Format shared with fields to use in share with mecanism
   */
  function getSelectedItemsFromSharedWith(shareWithUsers, shareInGroups, callback){

      if(!shareWithUsers && !shareInGroups){
        return callback([]);
      }

      if(!shareWithUsers){
        shareWithUsers = [];
      }

      if(!shareInGroups){
        shareInGroups = [];
      }

      var selectedItems = [];

      async.each(shareWithUsers, function(user, nextUser){
        selectedItems.push({
          id: user.get('id'),
          text: user.get('username'),
          model: 'user'
        });
        nextUser();
      },function(){
        async.each(shareInGroups, function(group, nextGroup){
          selectedItems.push({
            id: group.get('id'),
            text: group.get('name'),
            model: 'group'
          });
          nextGroup();
        },function(){
          callback(selectedItems);
        });
      });
  }
});