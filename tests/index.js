/**
 * Test starter - with this version of sails.js we can only start one sails server,
 * to solve this problem we use only one before All and after All to start and
 * stop the server
 */
var Sails = require('sails');
var fs = require('fs');

before(function(done) {

  this.timeout(5000);

  Sails.lift({
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
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});


// load models test
fs.readdirSync(__dirname + "/unit/models").forEach(function(file) {
  if(file.indexOf('.test.js') > -1) {
    require("./unit/models/" + file);
  }
});

// load controllers test
fs.readdirSync( __dirname + "/integration/controllers").forEach(function(file) {
  if(file.indexOf('.test.js') > -1) {
    require("./integration/controllers/" + file);
  }

});


// // load services tests
// fs.readdirSync( __dirname + "/unit/services").forEach(function(file) {
//   if(file.indexOf('.test.js') > -1) {
//     require("./unit/services/" + file);
//   }
// });

// // Load views tests
// // ----------------------------
// fs.readdirSync(__dirname + "/unit/views").forEach(function(file) {
//   if(file.indexOf('.test.js') > -1) {
//     require("./unit/views/" + file);
//   }
// });
