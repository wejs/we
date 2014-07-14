
define(['we','ember'], function (we) {

  // Map user routers
  App.Router.map(function(match) {
    // user route map
    this.resource('users',{path: '/user'}, function(){
      // item route
      this.resource('user',{ path: '/:user_id' }, function(){

        // edit item route
        this.route('contacts');
        // edit item route
        this.route('edit');
      });
    });
  });

  // route list
  App.UsersRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('user/feature');
    }
  });

  // route list
  App.UsersIndexRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('user')
    },
    renderTemplate: function() {
      this.render('user/list');
    }
  });

  // route /user/:uid/
  App.UserRoute = Ember.Route.extend({
    model: function(params) {
      var store = this.store;
      // get the user
      var hash = {
        user: this.store.find('user', params['user_id'])
      };

      // get contact relation
      var currentUserID = App.currentUser.get('id');
      if(currentUserID){
        hash.contact = new Ember.RSVP.Promise(function(resolve) {
         // //api/v1/user/:uid/contact/:contact_id
          Ember.$.ajax({
            type: 'GET',
            url: '/api/v1/user/'+currentUserID+'/contact/'+params['user_id'],
            dataType: 'json',
            contentType: 'application/json'
          }).done(function(contact){
            if(contact.id){
              resolve( store.push('contact',contact) );
            }else{
              resolve({});
            }

          }).fail(function(){
            resolve({});
          });
        });

      }else{
        hash.contact = {};
      }

      return Ember.RSVP.hash(hash);

    },
    renderTemplate: function() {
      this.render('user/item');
    }
  });

  // route /user/:uid/index
  App.UserIndexRoute = Ember.Route.extend({
    model: function() {
      var user_id = this.modelFor('user').user.get('id');
      return {
        posts: this.store.find('post',{
          creator: user_id
        })
      }
    },
  });

  // route /user/:uid/contact
  App.UserContactRoute = Ember.Route.extend({
    model: function() {
      var user_id = this.modelFor('user').get('id');
      return {
        // contacts:
        //   Ember.$.ajax({
        //     type: 'GET',
        //     url: '/user/'+userId+'/contacts-name',
        //     cache: false,
        //     dataType: 'json',
        //     contentType: 'application/json',
        //     success: function(data){
        //       element.select2({
        //         placeholder: "Share with ...",
        //         minimumInputLength: 3,
        //         multiple: true,
        //         data: data,
        //         formatResult: function(item){
        //           //console.warn('formatResult',item);

        //           return item.text;
        //         }, // omitted for brevity, see the source of this page
        //         formatSelection: function(item){
        //           //console.warn('formatSelection',item);
        //           return item.text;
        //         }, // omitted for brevity, see the source of this page
        //         dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
        //         escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
        //       });
        //     },
        //     error: function(data){
        //       console.error('Error on get share with list', data);
        //     }
        //   });
      }
    },
  });

  // route item /edit
  App.UserEditRoute = Ember.Route.extend({
    renderTemplate: function() {
      this.render('user/edit');
    }
  });
});