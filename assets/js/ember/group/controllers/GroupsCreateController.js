
define(['we','ember'], function (we) {

  App.GroupsCreateController = Ember.ObjectController.extend({
    privacityList: [
      {
        label: we.i18n('Public'),
        value:'public'
      },
      {
        label: we.i18n('Restrict'),
        value:'restrict'
      },

      {
        label: we.i18n('Private'),
        value:'private'
      },
      {
        label: we.i18n('Hidden'),
        value:'hidden'
      }
    ],
    group: {
      name: '',
      privacity: 'public'
    },
    actions:{
      submit: function(){
        var group = this.get('group');
        var _this = this;

        group.creator = this.get('store').getById('user', App.currentUser.get('id'));

        var newGroup = this.store.createRecord('group',group);
        newGroup.save().then(function(g){
          _this.transitionToRoute('group',g);
        });
      }
    }
  });

});