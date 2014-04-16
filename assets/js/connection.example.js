/**
 * connection.example.js
 *
 * This file contains some example, browser-side JavaScript for connecting
 * a client socket (i.e. browser tab) to your Sails backend using Socket.io.
 * It exposes a global object, `socket`, that you can
 *
 * Depending on your use case, this may or may not be the right approach.
 * This file is designed to get you up and running fast, but it's just an example.
 * Feel free to change none, some, or ALL of this file to fit your needs!
 *
 * For an annotated version of this file with additional examples, see:
 *   *-> https://gist.github.com/mikermcneil/8465536
 *
 * For more docs on using pubsub in Sails, from a client or as an API, see:
 *   *-> http://links.sailsjs.org/docs/pubsub
 */


// Immediately start connecting
socket = io.connect();

console.log('Connecting Socket.io to Sails.js...');


// Attach a listener which fires when a connection is established:
socket.on('connect', function socketConnected() {


  console.log(
    'Socket is now connected and globally accessible as `socket`.\n' +
    'e.g. to send a GET request to Sails via Socket.io, try: \n' +
    '`socket.get("/foo", function (response) { console.log(response); })`'
  );



  // Sends a request to a built-in, development-only route which which
  // subscribes this socket to the firehose, a channel which reports
  // all messages published on your Sails models on the backend, i.e.
  // publishUpdate(), publishDestroy(), publishAdd(), publishRemove(),
  // and publishCreate().
  //
  // Note that these messages are received WHETHER OR
  // NOT the current socket is actually subscribed to them.  The firehose
  // is useful for debugging your app's pubsub workflow-- it should never be
  // used in your actual app.
  socket.get('/firehose', function nowListeningToFirehose () {

	  // Attach a listener which fires every time Sails publishes
	  // message to the firehose.
    socket.on('firehose', function newMessageFromSails ( message ) {
      console.log('FIREHOSE (debug): Sails published a message ::\n', message);
    });
  });



  //
  // For example, let's say you have a model (`Group.js`), with three group
  // records, where the group with id=1 looks like this:
  // {
  //   "id"  : 1,
  //   "name": "Node.js Austin User Group",
  //   "createdAt": "2014-02-22T19:50:42.547Z",
	//   "updatedAt": "2014-02-22T19:50:42.547Z"
  // }
  //
  // You can allow sockets to subscribe to this group by building a custom
  // controller action that calls `Group.subscribe(req, 1)` on the backend.
  // Or, even easier, you can just send a request to the built-in `find` blueprint
  // action, which automatically subscribes the requesting socket to any records it
  // finds:
  socket.get('/group/1', function ( austinUserGroup ) {

		// If our socket was allowed to fetch information about this group, it is
		// now also subscribed any publishUpdate(), publishDestroy(), publishAdd(), and
		// publishRemove() calls from the backend.

		//
		// > #### v0.10 migration  note:
		// >
		// > The `find` blueprint action no longer automatically subscribes sockets to
		// > `Group.publishCreate()` on the `Group` model itself.  You can still subscribe
		// > to `Group.publishCreate()` by calling `Group.watch(req)` in your Sails
		// > controller.
		//

	  // Now this socket can listen for `group` events.  The event handler will
	  // be run any time one of this socket's subscribed-to Groups on the server
	  // publishes a message.
	  socket.on('group', function (msg) {

	    // ...
	    console.log('Received new message from Sails about group #', msg.id);
	    console.log('Here\'s what happened:',msg.verb);
	    console.log('Here\'s the relevant data:', msg.data);
	    // ...

	  });

		//
	  // > #### v0.10 migration note:
	  // >
	  // > The "message" event is no longer sent by Sails when using your
	  // > models' publish*() methods.  Instead, you can now listen directly
	  // > to events named after your models (e.g. the `group` listener above)
	  //

  });



});
