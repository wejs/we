
define(['we','ember'], function (we) {

  App.AuthRegisterController = Ember.Controller.extend({
    user: {},
    messages: [],

    isVisible: true,
    attributeBindings: ['isVisible'],

    defaultlanguages: ['en-us', 'pt-br'],
    emailPlaceholder: we.i18n('Your email'),
    passwordPlaceholder: we.i18n('Password'),
    confirmPasswordPlaceholder: we.i18n('Confirm password'),
    usernamePlaceholder: we.i18n('Pick a username'),

    init: function(){
      this._super();
      var self = this;

      if(we.authenticatedUser.id){
        this.set('isVisible', false);
      }

      we.hooks.on("user-authenticated",function(user, done){
        self.set('isVisible', false);
        done();
      });

      we.hooks.on("user-unauthenticated",function(user, done){
        self.set('isVisible', true);
        done();
      });

    },
    actions: {
      submit: function() {
        var self = this;
        var user = this.get('user');
        self.set('messages',[]);

        $.post('/signup',user)
        .done(function(data) {

          if(data.responseMessages){
            self.set('messages', data.responseMessages.success);
          }else if(data.id){
            // reload pega to load with new user
            location.reload();
            we.authenticatedUser = data;
            // we.hooks.trigger("user-authenticated", {
            //   'user':  data
            // });
          }else{
            console.warn('A unknow message in user register', data);
          }
        })
        .fail(function(data) {
          // handle validation error message;
          if(data.responseJSON.error === 'E_VALIDATION'){
            var messages = [];
            var invalidAttributes = data.responseJSON.invalidAttributes;

            for(var fieldName in invalidAttributes){
              // TODO add suport to multiple messages for same field
              messages.push({
                status: 'danger',
                field: fieldName,
                rule: invalidAttributes[fieldName][0].rule,
                message: we.i18n(invalidAttributes[fieldName][0].message)
              });
            }

            self.set('messages', messages);

          }else if(data.responseMessages){
            console.error( "TODO handle responseMessage error on register: ", data );
          }else{
            console.error( "Unknow error on register: ", data );
          }
        });

      }
    }
  });

});