/**
 * Test starter - with this version of sails.js we can only start one sails server,
 * to solve this problem we use only one before All and after All to start and
 * stop the server
 */
var Sails = require('sails');

before(function(callback) {
  this.timeout(5000);

  Sails.load({
    log: {
      level: 'error'
    },
    connections: {
      memory: {
        adapter   : 'sails-memory'
      }
    },
    models: {
      connection: 'memory'
    },
    port: 1330,
    environment: 'test',
    // @TODO needs suport to csrf token
    csrf: false,
    hooks: {
      grunt: false,
      pubsub: false
    }
  }, function(err, sails) {
    if (err) {
      return callback(err);
    }
    // here you can load fixtures, etc.
    callback(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});