
var should = require('should')
  , request = require('supertest')
  // , sinon   = require('sinon')
  , uuid = require('node-uuid');

function userStub () {
    return {
      username: uuid.v1()
      , name: "Alberto"
      , email: uuid.v1() + "@albertosouza.net"
      , password: uuid.v1()
    };
}

describe('UsersController', function() {

  afterEach(function(done){
    // remove all users after each test block
    User.destroy(function (err) {
      // if(err) return done(err);
      done();
    } );
  });

  // JSON REQUESTS //
  describe('JSON Requests', function() {
    describe('GET', function() {
      it('/api/v1/user without users in database return 200 and a empty array', function (done) {
        request(sails.hooks.http.app)
        .get('/api/v1/user')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if(err) return done(err);

          should.exist(res.body.user);
          res.body.user.should.be.an.Array;
          res.body.user.should.have.lengthOf( 0 );

          done();
        });
      });

      it('/user should return 200 and users array', function (done) {

        var user;
        // get 3 diferent users for salve in database
        var users = [
          userStub(),
          userStub(),
          userStub()
        ];

        User.createEach(users, function(err, newUsers) {
          if(err) return done(err);

          request(sails.hooks.http.app)
          .get('/api/v1/user')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if(err) return done(err);

            should.exist(res.body.user);
            res.body.user.should.be.an.Array;
            res.body.user[0].should.be.an.Object;
            res.body.user.should.have.lengthOf( users.length );
            done();
          });


        });
      });

      it('/api/v1/user/:uid should return 200 and one user', function (done) {

        User.create(userStub(), function(err, newUser) {
          if(err) return done(err);

          request(sails.hooks.http.app)
          .get('/api/v1/user/' + newUser.id)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if(err) return done(err);

            should(err).not.be.ok;
            should.exist(res.body.user);
            should(res.body.user).have.properties({
              'id': newUser.id
            });

            done();
          });

        });

      });

      it('/users/current should return 200 and logged in user object');

    });
    describe('POST', function() {

      /*
      // TODO add a create function for create user method need in admin users page
      it('/users should return 201 and new user object', function (done) {
        var user = userStub();
        var jsonResponse;

        user.confirmPassword = user.password;

        request(sails.hooks.http.app)
        .post('/signup')
        .set('Accept', 'application/json')

        //.set('X-CSRF-Token', testCsrfToken)
        .send( user )
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function (err, res) {

          if(err) return done(err);
          assert.equal(err, null);
          // TODO remove the duplicated signup url
          done();
        });
      });
      */

    });
    describe('PUT', function() {
     it('/users/:id should return 200 and updated user object');

    });
    describe('DELETE', function() {
      it('/users/:id should return 200 ');

    });
  }); // end requests

});
