
define(['we','ember'], function (we) {

  App.AuthChangePasswordController = Ember.ObjectController.extend({
    oldpasswordPlaceholder: 'Current password',
    passwordPlaceholder: 'New password',
    verificarSenha: function(){

      // verificar se a senha atual esta correta
      // salvar senha ao servidor
      // enviar mensagem ao usuário de senha alterada

    },
    actions: {
      submit: function(){

        var self = this;
        var oldPassword = self.get('user.oldpassword');
        var newPassword = self.get('user.password');
        var rNewPassword = self.get('user.repeatpassword');

        var userId = App.currentUser.get('id');
        //console.warn('UserId: ', userId);

        jQuery.ajax({          
          type: 'put',
          url: '/auth/'+userId+'/change-password',
          data: JSON.stringify({
            'oldPassword' : oldPassword,
            'newPassword' : newPassword,
            'rNewPassword' : rNewPassword
          }),
          contentType: 'application/json'
        })
        .done(function(data) {
          console.warn(data);
          /*if(data.success){
            _this.set('messages', data.success);
            _this.set('requestSend', true);
          }else{
            console.warn('requestPasswordChange: Unknow success message');
          }
          */
        })
        .fail(function(data) {
          console.debug(data);
          
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
