/**
 * MessengerController
 *
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  list: function (req,res) {
    var uid = req.param('uid');

    var query ;

    if(uid){
      query = {
        where: {
          or: [
            { fromId: uid,
              toId: req.user.id
            },
            {
              fromId: req.user.id,
              toId: uid
            }
          ]
        }
      };
    }else{
      query = {
        where: {
          or: [
            { fromId: null },
            { toId: null }
          ]
        }
      };
    }

    Messages.find(query)
    .limit(10)
    .sort('createdAt DESC')
    .exec(function(err, messages) {

      // Error handling
      if (err) {
        return console.log(err);
      }

      res.send(messages);

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
            toId: req.user.id
          },
          {
            fromId: req.user.id,
            toId: uid
          }
        ]
      }
    })
    .limit(15)
    .sort('createdAt DESC')
    .exec(function(err, messages) {

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
    .exec(function(err, messages) {
      // Error handling
      if (err) {
        return console.log(err);
      }
      console.warn(messages);
      // Found multiple messages!
      if (messages) {
        res.json({
          messages: messages
        });
      }
    });
  },

  // add message
  // create: function (req, res, next) {
  //   var message = {};
  //   message.content = req.param("content");
  //   message.fromId = req.param("fromId");
  //   message.toId = req.param("toId");

  //   console.warn('create messsage');

  //   Messages.create(message).exec(function (error, newMessage){
  //     if (error) {
  //       console.log(error);
  //       res.send(500, {error: res.i18n("DB Error") });
  //     } else {
  //       // TODO add suport to rooms
  //       if(message.toId){
  //         // if has toId send toId
  //         sails.io.sockets.in('user_' + newMessage.toId[0]).emit(
  //           'receive:message',
  //           {
  //             message: newMessage
  //           }
  //         );
  //       } else {
  //         console.log('sendo to public');
  //         // send to public room
  //         sails.io.sockets.in('public').emit(
  //           'receive:public:message',
  //           {
  //             message: newMessage
  //           }
  //         );
  //       }


  //       if(req.isSocket){
  //         res.send({
  //           message: newMessage
  //         });
  //       } else {
  //         res.send({
  //           message: newMessage
  //         });
  //       }

  //     }
  //   });
  // },

  /**
   * Start messenger / loggin in messenger
   */
  start: function(req, res){
    if(!req.isAuthenticated()) return res.forbidden('forbidden');

    var userId = req.user.id;
    var user = req.user;
    var socket = req.socket;

    if(typeof sails.onlineusers === 'undefined' )
      sails.onlineusers = {};

    // save user data in online users cache
    if(typeof sails.onlineusers[userId] === 'undefined' ){
      user.messengerStatus = 'online';

      // save a the new socket connected on links users
      sails.onlineusers[userId] = {
        user: user.toJSON(),
        sockets: []
      };

      sails.onlineusers[userId].sockets.push(socket.id);

      // TODO change to send to friends
      sails.io.sockets.in('global').emit('contact:connect', {
        status: 'connected',
        item: user
      });

    } else {
      sails.onlineusers[userId].sockets.push(socket.id);
    }

    // join user exclusive room to allow others users send
    // mesages to this user
    // User.subscribe(socket , [userId] );
    socket.join('user_' + userId);


    // TODO change to userId friends room
    socket.join('global');

    // Public room
    // TODO make this dynamic and per user configurable
    socket.join('public');


    res.send(200, req.user);
  },

  /**
   * Get contact list
   * TODO add suport to friends and roons
   */
  getContactList: function (req, res, next){
    if(!req.user){
      return res.forbidden('forbidden');
    }

    var friendList = [];

    // get contact/friend list from online users
    // TODO implement contact list
    _.forEach(sails.onlineusers, function(onlineuser){
      if(onlineuser.sockets.length){
        if(req.user.id != onlineuser.user.id){
          friendList.push(onlineuser.user);
        }
      }
    });

    // TODO change this response to array
    res.send(friendList);
  },

  /**
   * Create one message
   * @requires  User Logged in
   */
  createRecord: function (req, res, next) {
    var message = {};
    message.content = req.param("content");
    message.fromId = req.user.id;
    message.toId = req.param("toId");

    Messages.create(message).exec(function (error, newMessage){
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
          // send to public room
          sails.io.sockets.in('public').emit(
            'receive:public:message',
            {
              message: newMessage
            }
          );
        }
        res.send(newMessage);
      }
    });
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
