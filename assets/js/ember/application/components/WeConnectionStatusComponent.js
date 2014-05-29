define(['we','ember'], function (we) {
  App.WeConnectionStatusComponent = Ember.Component.extend({
    isConnected: false,
    status: we.i18n('disconected'),
    statusImageUrl: function(){
      var status = this.get('status');
      if(status == we.i18n('connected') ){
        return '/imgs/connected.png';
      }else if(status == we.i18n('reconnecting') ){
        return '/imgs/reconnecting.gif';
      }else{
        return '/imgs/disconnected.png';
      }
    }.property('status'),
    statusLegend: function(){
       var status = this.get('status');
      if(status == we.i18n('connected') ){
        return "Connected - click to disconnect";
      }else if(status == we.i18n('reconnecting') ){
        return "Reconnecting ...";
      }else{
        return "Disconnected - click to connect";
      }
    }.property('status'),
    init: function initWeMessengerComponent(){
      this._super();

      var _this = this;
      if(we.io.socket.socket && we.io.socket.socket.connected){
        _this.setProperties({
          isConnected: true,
          status: we.i18n('connected')
        });
      }

      we.events.on("socketIoConnect",function(){
        _this.setProperties({
          isConnected: true,
          status: we.i18n('connected')
        });
      });

      we.events.on("socketIoDisconnect",function(){
        _this.setProperties({
          isConnected: false,
          status: we.i18n('disconnected')
        });
      });

      we.events.on("socketIoReconnect",function(){
        _this.setProperties({
          isConnected: true,
          status: we.i18n('connected')
        });
      });

      we.events.on("socketIoReconnecting",function(){
        _this.setProperties({
          isConnected: false,
          status: we.i18n('reconnecting')
        });
      });

    },
    actions: {
      connect: function openList(){
        we.io.connect();
      },
      disconnect: function closeList(){
        we.io.disconnect();
      },
      toggleConnection: function closeList(){
        var status = this.get('status');
        if(status == 'connected' ){
          we.io.disconnect();
        }else if(status == 'disconnected'){
          we.io.connect();
        }
      }
    }

  });
});