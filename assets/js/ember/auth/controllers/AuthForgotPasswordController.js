
define(['we','ember'], function (we) {

  App.AuthForgotPasswordController = Ember.ObjectController.extend({
    requestSend: false,
    emailPlaceholder: we.i18n('Enter your email address here'),
    actions: {
      //Submit the modal
      requestPasswordChange: function() {
        var _this = this;

        var email = this.get("email");
        jQuery.post('/auth/forgot-password',{
          email: email
        })
        .done(function(data) {
          if(data.success){
            _this.set('messages', data.success);
            _this.set('requestSend', true);
          }else{
            console.warn('requestPasswordChange: Unknow success message');
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

          }else if(data.responseJSON.errors){
            _this.set('messages', data.responseJSON.errors);
          }else{
            console.error( "Unknow error on request password: ", data );
          }
        });
      }
    }
  });

});
