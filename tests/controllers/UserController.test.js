
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var sinon   = require('sinon');
var uuid = require('node-uuid');

function UserStub () {
    return {
      username: uuid.v1(),
      name: "Alberto",
      email: uuid.v1() + "@albertosouza.net",
      password: uuid.v1()
    };
}

describe('UsersController', function() {

  afterEach(function(done){
    // remove all users after each test block
    Users.destroy(function (err) {
      if(err) return done(err);
      done();
    } );
  });

  // JSON REQUESTS //
  describe('JSON Requests', function() {
    describe('GET', function() {

      it('/users without users in database return 200 and a empty array', function (done) {

        request(sails.express.app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if(err) return done(err);

          res.body.should.be.an.Array;
          res.body.should.have.lengthOf( 0 );
        
          done();
        });
      });

      it('/users should return 200 and users array', function (done) {
        
        var user;
        // get 3 diferent users for salve in database
        var users = [
          UserStub(),
          UserStub(),
          UserStub()
        ];

        Users.createEach(users, function(err, newUsers) {
          if(err) return done(err);
          
          request(sails.express.app)
          .get('/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if(err) return done(err);

            res.body.should.be.an.Array;
            res.body[0].should.be.an.Object;
            res.body.should.have.lengthOf( users.length );
            done();
          });

            
        });
      });

      it('/users should return 200 and one user', function (done) {

        Users.create(UserStub(), function(err, newUser) {
          if(err) return done(err);

          request(sails.express.app)
          .get('/users/' + newUser.id)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if(err) return done(err);

            should.not.exist(err);
            res.body.email.should.equal(newUser.email);
            res.body.id.should.equal(newUser.id);

            done();
          });

        });

      });      

      it('/users/current should return 200 and logged in user object');

    });
    describe('POST', function() {

      it('/users should return 201 and new user object', function (done) {
        var user = UserStub();
        var jsonResponse;

        user.confirmPassword = user.password;

        request(sails.express.app)
        .post('/signup')
        .set('Accept', 'application/json')

        //.set('X-CSRF-Token', testCsrfToken)
        .send( user )
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function (err, res) {
          
          if(err) return done(err);
          assert.equal(err, null);
          jsonResponse = JSON.parse(res.text);
          res.statusCode.should.equal(200);
          done();
        });
      });

    });
    describe('PUT', function() {
     it('/users/:id should return 200 and updated user object');

    });
    describe('DELETE', function() {
      it('/users/:id should return 200 ');

    });
  }); // end requests

});
