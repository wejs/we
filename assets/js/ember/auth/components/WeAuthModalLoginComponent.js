
define(['we','ember'], function (we) {
  App.WeAuthModalLoginComponent = Ember.Component.extend({
    //templateName: 'auth/login',
    isVisible: true,
    email: '',
    password: '',
    emailPlaceholder: 'Email address',
    passwordPlaceholder: 'Password',
    messages: [],
    /**
      Returns the application's main router from the container.

      @private
      @property router
    **/
    router: Ember.computed(function() {
      return Ember.get(this, 'controller').container.lookup('router:main');
    }),
    init: function() {
      this._super();
      var thisView = this;
      //this.set("controller", App.ModalLoginController.create());

      if(we.authenticatedUser.id){
        this.set('isVisible', false);
      }

      we.hooks.on("user-authenticated",function(user, done){
        thisView.set('isVisible', false);
        done();
      });

      we.hooks.on("user-unauthenticated",function(user, done){
        thisView.set('isVisible', true);
        done();
      });
    },
    actions: {
      //Submit the modal
      login: function() {
        var _this = this;
        $.post('/auth/login',{
          email: this.get("email"),
          password: this.get("password")
        })
        .done(function(data) {
          if(data.id){
            we.authenticatedUser = data;
            we.hooks.trigger("user-authenticated", {
              'user':  data
            });
            location.reload();
            jQuery('#AuthLoginModal').modal('hide');
          }
        })
        .fail(function(data) {
          if(data.responseText){
            var responseJSON = jQuery.parseJSON(data.responseText);
            _this.set('messages', [{
              status: 'danger',
              message: responseJSON.error[0].message
            }]);
          }else{
            console.error( "Error on login",data);
          }
        });
      },

      cancel: function() {
        jQuery('#AuthLoginModal').modal('hide');
      },

      //Show the modal
      showModal: function() {
        jQuery('#AuthLoginModal').modal('show');
      },

      goToForgotPaswordPage: function(){
        jQuery('#AuthLoginModal').modal('hide');
        this.get('router').transitionTo('authForgotPassword');
      },

      goToRegisterPage: function(){
        jQuery('#AuthLoginModal').modal('hide');
        this.get('router').transitionTo('authRegister');
      }

    }

  });
});