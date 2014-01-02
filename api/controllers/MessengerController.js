/**
 * MessengerController
 *
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function (req,res) {

    var format = 'json';
    if(req.param('format')){
      format = req.param('format');
    }

    Messages.find({})
    .limit(10)
    .sort('createdAt ASC')
    .done(function(err, messages) {

      // Error handling
      if (err) {
        return console.log(err);
      }
      // Found multiple messages!
      if (messages) {

        if(format == 'json'){
          res.json({
            messages: messages
          });
        } else {
          res.view({
            messages: messages
          });
        }
      }
    });
  },


  // add message
  create: function (req, res, next) {
    var message = {};
    message.content = req.param("content");
    message.fromId = req.param("fromId");
    message.toId = req.param("toId");

    Messages.create(message).done(function (error, newMessage){
      if (error) {
        console.log(error);
        res.send(500, {error: res.i18n("DB Error") });
      } else {

        if(req.isSocket){
          sails.io.sockets.in('user_' + newMessage.toId[0]).emit(
            'receive:message',
            {
              message: newMessage
            }
          );
        } else {
          res.send({
            message: newMessage
          });
        }

      }
    });
  },

  start: function (req, res, next){
    var friendList = {};
    friendList = sails.onlineusers

    res.send(
      {
        friendList: friendList
      }
    );

   // TODO change to send to friends
    sails.io.sockets.in('global').emit('contact:connect', {
      status: 'connected',
      contact: req.user.toJSON()
    });

  }


};
