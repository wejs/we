
define(['we','ember'], function (we) {
  /**
   * postEditForm to render view form in sharebox and edit form
   */
  App.postEditFormView = Ember.View.extend({
    tagName: 'form',
    templateName: 'post/edit-form-content-view',
    submit: function(){
      this.get('controller').send('submit');
      // stop event propagation
      return false;
    }
  });
});