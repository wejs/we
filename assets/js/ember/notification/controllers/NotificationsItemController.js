
define(['we','ember'], function (we) {

  App.NotificationsItemController = Ember.ObjectController.extend({
    itemClass: function(){
      return this.get('notified');
    }.property('model.notified'),
    linkStatusText: function(){
      if(this.get('notified') == 'notificado'){
        return 'Lida';
      }else{
        return 'Não Lida';
      }
    }.property('model.notified'),
    status: 'salved',
    actions: {
      changeNotificedStatus: function(){
        if(this.get('notified') == 'notificado'){
          this.send('marcarComoNaoLida');
        }else{
          this.send('marcarComoLida');
        }
      },
      marcarComoLida: function(){
        var model = this.get('model');
        window.testes = model;
        console.warn(model);
        model.set('notified', 'notificado');
        return console.warn('marcarComoLida');

        var _this = this;
        var id = this.get('id');

        _this.set('status','loading');

        $.ajax({
          type: 'GET',
          url: '/api/v1/notify/mark-as-read/'+id,
          dataType: 'json',
          cache: false,
          contentType: 'application/json'
        }).done(function(data){
          _this.set('status','salved');
          console.warn('data',data);
        }).fail(function(jqXHR, textStatus, errorThrown){
          _this.set('status','error');
          console.error(jqXHR);
        });
      },
      marcarComoNaoLida: function(){
        console.warn('marcarComoNaoLida');
      }
    }
  });

});