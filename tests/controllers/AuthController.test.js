var should = require('should');
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


describe('AuthController', function() {

  afterEach(function(done){
    // remove all users after each test block
    Users.destroy(function (err) {
      if(err) return done(err);
      done();
    } );
  });

  // JSON REQUESTS //
  describe('JSON Requests', function() {
    describe('POST', function() {
      it('/users/login should login a user with new password, return 200 and logged in user object',function (done) {
        var user  = UserStub();
        var authParams = {
          email: user.email,
          password: user.password
        };

        Users.create(user, function(err, newUser) {
          if(err) return done(err);

          request(sails.express.app)
          .post('/users/login')
          .set('Accept', 'application/json')

          //.set('X-CSRF-Token', testCsrfToken)
          .send( authParams )
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {       
            if(err) return done(err);
            // TODO add suport for server messages
            // 
            res.body.email.should.equal(user.email);
            res.body.should.be.instanceof(Object);

            done();
          });

        });

      });

      it('/users/login shold return 401 with wrong password message',function (done) {
        var user  = UserStub();
        var authParams = {
          email: user.email,
          password: 'aRealyWrongPassword'
        };
        // create user to test
        Users.create(user, function(err, newUser) {
          if(err) return done(err);

          request(sails.express.app)
          .post('/users/login')
          .set('Accept', 'application/json')

          //.set('X-CSRF-Token', testCsrfToken)
          .send( authParams )
          .expect('Content-Type', /json/)
          .expect(401)
          .end(function (err, res) {         
            if(err) return done(err);
            // TODO add suport for server messages
            should.not.exist(res.body.email);
            console.log(res.body);
            done();
          });

        });

      });

      it('/users/logout should logout a user and return 200');

      it('/users/logout should logout a user, return 200 and redirect to index');

    });
  }); // end requests
});
