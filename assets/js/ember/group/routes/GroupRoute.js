
define(['we','ember'], function (we) {

  // route list
  App.GroupsRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('group/feature');
    }
  });

  // route list
  App.GroupsIndexRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('group')
    }
  });

  // route list
  App.GroupsCreateRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('group/create');
    }
  });

  // route /groups/:uid/
  App.GroupRoute = Ember.Route.extend({
    // model: function(params) {
    //   var store = this.store;
    //   // get the user
    //   var hash = {
    //     user: this.store.find('user', params['user_id'])
    //   };

    //   // get contact relation
    //   var currentUserID = App.currentUser.get('id');
    //   if(currentUserID){
    //     hash.contact = new Ember.RSVP.Promise(function(resolve) {
    //      // //api/v1/user/:uid/contact/:contact_id
    //       Ember.$.ajax({
    //         type: 'GET',
    //         url: '/api/v1/user/'+currentUserID+'/contact/'+params['user_id'],
    //         dataType: 'json',
    //         contentType: 'application/json'
    //       }).done(function(contact){
    //         if(contact.id){
    //           resolve( store.push('contact',contact) );
    //         }else{
    //           resolve({});
    //         }

    //       }).fail(function(){
    //         resolve({});
    //       });
    //     });

    //   }else{
    //     hash.contact = {};
    //   }

    //   return Ember.RSVP.hash(hash);

    // },
    renderTemplate: function() {
      this.render('group/item');
    }
  });

  // route /user/:uid/index
  App.GroupIndexRoute = Ember.Route.extend({
    model: function() {
      return {
        group: this.modelFor('group'),
        // posts: this.store.find('post',{
        //   creator: user_id
        // })
      }
    },
    renderTemplate: function() {
      this.render('group/index');
    }
  });

});