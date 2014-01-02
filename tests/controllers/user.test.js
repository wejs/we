/**
 * Bootstrap
 * Logged of user and public access tests
 */

var Sails = require('sails');
var assert = require('assert');
    //Utils = require('./utils'),
    //Database = require('./database'),
    //localConf = require('../../config/local');
var request = require('supertest');
var sinon   = require('sinon');


function UserStub () {
    return {
      username: 'albertosouza',
      name: "Alberto",
      email: "contato@albertosouza.net",
      password: "123"
    };
}


/**
 * Before ALL the test bootstrap the server
 */

var app;

before(function(done) {

  this.timeout(5000);

  // TODO: Create the database
  // Database.createDatabase.....

  var config = gettestConfig();

  Sails.lift( config , function(err, sails) {
    app = sails;
    done(err, sails);
  });

});

/* exemple
describe('Basic', function(done) {
  it("should cause error", function(done) {
    assert.equal(1, 2, "error");
    done();
  });
});
*/

describe('Users', function(done) {
/*
  describe('Model', function(done) {
    describe('Create', function(done) {
      it("Should be able to create a user", function(done) {
        Users.create(UserStub(), function(err, user) {
          if(err) console.log(err);
          assert.notEqual(user, undefined);
          done();
        });
      });

      it("Should return error on create user with already registered email", function(done) {
        Users.create(UserStub(), function(err, user) {
          err.should.not.be.empty;
          assert.equal(user, undefined);
          done();
        });
      });

    });
  }); // end database
*/
  // JSON REQUESTS //
  describe('Requests', function(done) {
    it('GET /users should return 200 and users array', function (done) {
      request(app.express.app)
      .get('/users?format=json')
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        // TODO implement response data check
        //res.body.users.should.be.an.instanceOf(Array);
        done();
      });
    });

    it('POST /users should return 200 and new user object', function (done) {
      var user = UserStub();
      var jsonResponse;

      user.confirmPassword = user.password;

      request(app.express.app)
      .post('/signup?format=json')
      .send( user )
      .end(function (err, res) {
        assert.equal(err, null);
        console.log(res.text);
        jsonResponse = JSON.parse(res.text);
        console.log(jsonResponse);
        console.log(res.statusCode);
        res.statusCode.should.equal(200);
        done();
      });
    });

  }); // end requests

});
/**
 * After ALL the tests, lower sails
 */

after(function(done) {

  // TODO: Clean up db
  // Database.clean...

  app.lower(done);

});
