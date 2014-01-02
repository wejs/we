/**
 * Test starter - with this version of sails.js we can only start one sails server, 
 * to solve this problem we use only one before All and after All to start and 
 * stop the server
 */

var Sails = require('sails');
var fs = require("fs");

/**
 * Before ALL the test bootstrap the server
 */
before(function(done) {

  this.timeout(5000);

  // TODO: Create the database
  // Database.createDatabase.....
  var config = gettestConfig();

  // start sails server and for tests and user the global sails variable
  Sails.lift( config, function(err, sails) {
    done();
    /* 
    // CSRF getter 
    getTestCsrfToken(function(err, csrf){
      done();
    });
    */
  });

});


// load models test
fs.readdirSync(__dirname + "/models").forEach(function(file) {
  if(file.indexOf('.test.js') > -1) {
    require("./models/" + file);
  }
});

// load controllers test
fs.readdirSync( __dirname + "/controllers").forEach(function(file) {
  if(file.indexOf('.test.js') > -1) {
    require("./controllers/" + file);  
  }
  
});


/**
 * After ALL the tests, lower sails
 */
after(function(done) {
  // TODO: Clean up db
  // Database.clean...
  sails.lower(done);

});
