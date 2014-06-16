/**
 * WeWysiwygEditorComponent editor html for we.js
 */
define(['we','summernote','ember'], function (we, summernote) {

  App.WeWysiwygEditorComponent = Ember.Component.extend({
    editor: {},
    tagName: 'div',
    didInsertElement: function() {
      this._super();
      var _this = this;
      // append summernote div tag for create the editor in it
      _this.$().append('<div class="summernote">'+_this.get('value')+'</div>');
      // create the editor
      var editor =  _this.$('.summernote').summernote({
        focus: true,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'clear']],
          // ['fontname', ['fontname']],
          // ['fontsize', ['fontsize']], Still buggy
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
          ['view', [
            'fullscreen',
            //'codeview'
          ]],
          //['help', ['help']]
        ],
        onkeyup: function(e) {
          // on keyUp update the binded value variable
          _this.set('value',editor.code());
        },
        onblur: function(e) {
          _this.set('value',editor.code());
        }
      });
      // salve editor on ember component variable
      this.set('editor', editor);
    },

    // on destroy remove the editor
    willDestroyElement: function() {
      this._super();
      this.get('editor').destroy();
    }

  });


});