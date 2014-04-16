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

  /**
   * Return last messages between logged in user and :uid user
   */
  messagesWithUser: function (req,res){

    var uid = req.param('uid');

    // return forbiden
    if(!uid) return res.notFound('No messages found');

    Messages.find({
      where: {
        or: [
          { fromId: uid,
            toId: {
              contains: req.user.id
            }

          },
          {
            fromId: req.user.id,
            toId: {
              contains: uid
            }
          }
        ]
      },
    })
    .limit(15)
    .sort('createdAt DESC')
    .done(function(err, messages) {

      // Error handling
      if (err) {
        return console.log(err);
      }
      // Found multiple messages!
      if (messages) {
        res.json({
          messages: messages
        });
      }
    });
  },


  /**
   * Return last messages between logged in user and :uid user
   */
  getPublicMessages: function (req,res){
    Messages.find({
      where: {
        or: [
          { fromId: null },
          { toId: null }
        ]
      },
    })
    .limit(10)
    .sort('createdAt DESC')
    .done(function(err, messages) {
      // Error handling
      if (err) {
        return console.log(err);
      }
      // Found multiple messages!
      if (messages) {
        res.json({
          messages: messages
        });
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

        // TODO add suport to rooms
        if(message.toId){
          // if has toId send toId
          sails.io.sockets.in('user_' + newMessage.toId[0]).emit(
            'receive:message',
            {
              message: newMessage
            }
          );
        } else {
          console.log('sendo to public');
          // send to public room
          sails.io.sockets.in('public').emit(
            'receive:public:message',
            {
              message: newMessage
            }
          );
        }


        if(req.isSocket){

        } else {
          res.send({
            message: newMessage
          });
        }

      }
    });
  },

  /**
   * Start messenger
   */
  start: function(req, res){
    if(!req.user) res.forbidden('forbidden');

    var contact = req.user.toJSON();
    // set user status
    contact.messengerStatus = 'online';

    res.send(200,'');

    // TODO change to send to friends
    sails.io.sockets.in('global').emit('contact:connect', {
      status: 'connected',
      contact: contact
    });
  },

  /**
   * Get contact list
   * TODO add suport to friends and roons
   */
  getContactList: function (req, res, next){
    var friendList = {};
    // get contact/frinend list
    friendList = sails.util.clone(sails.onlineusers);

    // remove current user from list
    delete(friendList[req.user.id]);

    res.send(
      {
        friendList: friendList
      }
    );
  },

  /**
   * I am writing!
   * Socket.io
   * Send 'user:writing' event
   */
  emitIamWriting: function (req, res, next){

    var toUserId = req.param('toUserId');
    var toRoom = req.param('toRoom');
    var toGlobal = req.param('global');

    if(!toUserId && !toRoom && !toGlobal){
      return res.badRequest('Bad Request');
    }

    if(toUserId){
      //var fromUserId = socket.handshake.session.passport.user;

      sails.io.sockets.in('user_' + toUserId).emit(
        'user:writing',
        {
          user: {
            id: req.session.passport.user
          }
        }
      );
    }

    if(toRoom){
      // TODO
    }

    if(toGlobal){
      //res.send(200,'');
      // TODO change to send to friends
      sails.io.sockets.in('global').emit('user:writing', {
        user: req.user
      });
    }

    res.send(200,'');
  }

};
