/**
 * MessengerController
 *
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
var util = require('util');
var _ = require('lodash');

module.exports = {

  list: function (req,res) {
    if(!req.isAuthenticated()) return res.forbidden('forbidden');

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
    } else {
      query = {
        where: {
          or: [
            { fromId: null },
            { toId: null }
          ]
        }
      };
    }

    Message.find(query)
    .limit(15)
    .sort('createdAt DESC')
    .exec(function(err, messages) {
      // Error handling
      if (err) {
        sails.log.error('messenger:list:Error on get messages from db', err);
        return res.negotiate(err);
      }

      return res.send({
        message: messages
      });

    });
  },

  /**
   * Return last messages between logged in user and :uid user
   */
  messagesWithUser: function (req,res){
    if(!req.isAuthenticated()) return res.forbidden('forbidden');

    var uid = req.param('uid');

    // return forbiden
    if(!uid) return res.notFound('No messages found');

    Message.find({
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
    Message.find({
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

  /**
   * Start messenger / loggin in messenger
   */
  start: function startMessenger(req, res){
    if(!req.isAuthenticated()) return res.forbidden('forbidden');

    if (!req.isSocket) {
      sails.log.warn('Start messenger without socket.io not is implemented',req.user.id);
      return res.badRequest();
    }

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
    if(!req.isAuthenticated()) return res.forbidden('forbidden');

    var contactList = [];

    // get contact/friend list from online users
    // TODO implement contact list
    _.forEach(sails.onlineusers, function(onlineuser){
      if(onlineuser.sockets.length){
        if(req.user.id != onlineuser.user.idInProvider){
          contactList.push(onlineuser.user);
        }
      }
    });

    // TODO change this response to array
    res.send(contactList);
  },

  /**
   * Create one message
   *
   * @requires User authenticated
   */
  createRecord: function (req, res) {
    if(!req.isAuthenticated()) return res.forbidden('forbidden');

    var message = {};
    message.content = req.param('content');
    message.fromId = req.user.id;
    message.toId = req.param('toId');

    // public message
    if (!message.toId) {
      return Message.create(message).exec(function (error, newMessage){
        if (error) {
          console.log(error);
          return res.send(500, {error: res.i18n('DB Error') });
        }
        // send to public room
        sails.io.sockets.in('public').emit(
          'receive:public:message',
          {
            message: newMessage
          }
        );
        return res.send(newMessage);
      });
    }

    // to contact message
    return Contact.getUsersRelationship(message.fromId, message.toId, function(err, contact) {
      if (err) {
        sails.log.error('CreateMessage:Contact.getUsersRelationship:', err);
        return res.serverError();
      }

      // user dont are one contact
      if (!contact || ( contact.status !== 'accepted' ) ) {
        return res.forbidden();
      }

      Message.create(message)
      .exec(function createMessageToContact(error, newMessage) {
        if (error) {
          sails.log.error('createMessageToContact:', error);
          return res.serverError();
        }

        // set contact id in new message to help update or open
        // contact box on client side
        newMessage.contactId = contact.id;

        var socketRoomName = 'user_' + newMessage.toId;
        // if has toId send the message in sails.js default responde format
        sails.io.sockets.in(socketRoomName).emit(
          'message',
          {
            id: newMessage.id,
            verb: 'created',
            data: newMessage
          }
        );

        return res.ok({message: newMessage});
      });
    });

  },

  update: function (req, res) {

    // Look up the model
    var Model = Message;

    // Locate and validate the required `id` parameter.
    var pk = actionUtil.requirePk(req);

    // Create `values` object (monolithic combination of all parameters)
    // But omit the blacklisted params (like JSONP callback param, etc.)
    var values = actionUtil.parseValues(req);

    // Omit the path parameter `id` from values, unless it was explicitly defined
    // elsewhere (body/query):
    var idParamExplicitlyIncluded = ((req.body && req.body.id) || req.query.id);
    if (!idParamExplicitlyIncluded) delete values.id;

    delete values.createdAt;
    delete values.updatedAt;

    // Find and update the targeted record.
    //
    // (Note: this could be achieved in a single query, but a separate `findOne`
    //  is used first to provide a better experience for front-end developers
    //  integrating with the blueprint API.)
    Model.findOne(pk).populateAll().exec(function found(err, matchingRecord) {

      if (err) return res.serverError(err);
      if (!matchingRecord) return res.notFound();

      Model.update(pk, values).exec(function updated(err, records) {

        // Differentiate between waterline-originated validation errors
        // and serious underlying issues. Respond with badRequest if a
        // validation error is encountered, w/ validation info.
        if (err) return res.negotiate(err);


        // Because this should only update a single record and update
        // returns an array, just use the first item.  If more than one
        // record was returned, something is amiss.
        if (!records || !records.length || records.length > 1) {
          req._sails.log.warn(
          util.format('Unexpected output from `%s.update`.', Model.globalId)
          );
        }

        var updatedRecord = records[0];

        if ( updatedRecord.toId && req.isSocket) {
          // to contact message
          var socketRoomName = 'user_' + updatedRecord.fromId;
          // if has toId send the message in sails.js default responde format
          sails.io.sockets.in(socketRoomName).emit(
            'message',
            {
              id: updatedRecord.id,
              verb: 'updated',
              data: updatedRecord
            }
          );

        } else {
          // public room
          res.ok({message: updatedRecord});
        }

      });// </updated>
    }); // </found>
  },

  /**
   * Messages dont have a delete feature
   */
  destroy: function (req, res) {
    return res.badRequest();
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

function createContactMessage (message){
  Message.create(message).exec(function (error, newMessage){
    if (error) {
      console.log(error);
      return res.send(500, {error: res.i18n('DB Error') });
    }
    // TODO add suport to rooms
    if(message.toId){

      var socketRoomName = 'user_' + newMessage.toId;
      // if has toId send the message in sails.js default responde format
      sails.io.sockets.in(socketRoomName).emit(
        'message',
        {
          id: newMessage.id,
          verb: 'created',
          data: newMessage
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
    return res.send(newMessage);

  });
}
