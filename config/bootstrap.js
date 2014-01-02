/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {

  sails.io.on('connection', function(socket) {

    var userId = socket.handshake.session.passport.user;
    if(userId){
      if(typeof sails.onlineusers === 'undefined' )
        sails.onlineusers = {};

      // save user data in online users cache
      if(typeof sails.onlineusers[userId] === 'undefined' ){
        Users.findOneById(userId).done(function(err, user){
              console.log(sails.onlineusers);
          sails.onlineusers[userId] = user.toJSON();
        });

      }

      // join user exclusive room to allow others users send
      // mesages to this user
      // Users.subscribe(socket , [userId] );
      socket.join('user_' + userId);

    }
    // TODO change to userId friends room
    socket.join('global');

    socket.on('disconnect', function () {
        console.log('Disconect!!! ');
        if(userId){
          // TODO change to send to friends
          sails.io.sockets.in('global').emit('contact:disconnect', {
              status: 'disconected',
              contact: {
                id: userId
              }
          });

          console.log('sned Disconect!!! ');
          // remove user from users online
          delete sails.onlineusers[userId];
        }

    });
  });
  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};