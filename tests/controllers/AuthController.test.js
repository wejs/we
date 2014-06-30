
var should = require('should');
var request = require('supertest');
var sinon   = require('sinon');
var uuid = require('node-uuid');

var testUtils = require('../testUtils.js');

function UserStub () {
  return {
    username: uuid.v1(),
    name: "Alberto",
    email: 'alberto.souza.99@gmail.com',
    password: uuid.v1()
  };
}


describe('AuthController', function() {

  after(function(done){
    testUtils.emptyDatabase(done);
  });

  // JSON REQUESTS //
  describe('JSON Requests', function() {

    afterEach(function(done){
      // remove all users after each test block
      User.destroy(function (err) {
        if(err) return done(err);
        done();
      } );
    });

    describe('POST', function() {
      it('/users/login should login a user with new password, return 200 and logged in user object',function (done) {
        var user  = UserStub();
        var authParams = {
          email: user.email,
          password: user.password
        };

        User.create(user, function(err, newUser) {
          if(err) return done(err);

          request(sails.hooks.http.app)
          .post('/auth/login')
          .set('Accept', 'application/json')

          //.set('X-CSRF-Token', testCsrfToken)
          .send( authParams )
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if(err) return done(err);

              // check if new user is returned
              should.exist(res.body.id);

              // check if has a error message
              should.not.exist(res.body.error);
              should.not.exist(res.body.invalidAttributes);

            done();
          });

        });

      });
      it('/signup when confirmPassword is diferent than password return 400 with error message',function (done) {
        var user  = UserStub();

        user.confirmPassword = 'a diferent password';

        request(sails.hooks.http.app)
        .post('/signup')
        .set('Accept', 'application/json')

        //.set('X-CSRF-Token', testCsrfToken)
        .send( user )
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          if(err) return done(err);

          should.not.exist(res.body.id);

          // check if has a error message
          should.exist(res.body.error);
          should.exist(res.body.invalidAttributes);

          done();
        });

      });

      it('/signup when dont have password return 400 with error message',function (done) {
        var user  = UserStub();

        delete(user.password);

        request(sails.hooks.http.app)
        .post('/signup')
        .set('Accept', 'application/json')

        //.set('X-CSRF-Token', testCsrfToken)
        .send( user )
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          if(err) return done(err);

          should.not.exist(res.body.id);

          // check if has a error message
          should.exist(res.body.error);
          should.exist(res.body.invalidAttributes);

          done();
        });

      });

      it('/signup when email has a wrong format 400 with error message',function (done) {
        var user  = UserStub();

        user.email = 'a wrong email';
        user.confirmPassword = user.password;

        request(sails.hooks.http.app)
        .post('/signup')
        .set('Accept', 'application/json')

        //.set('X-CSRF-Token', testCsrfToken)
        .send( user )
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          if(err) return done(err);

          should.not.exist(res.body.id);
          should.not.exist(res.body.email);

          // check if has a error message
          should.exist(res.body.error);
          should.exist(res.body.invalidAttributes);

          done();
        });

      });

      it('/signup should return 400 if email is already registered with error message',function (done) {

        var user = UserStub();
        user.confirmPassword = user.password;
        var salvedUser = sails.util.clone(user);

        User.create(salvedUser, function(err, userCreated){
          if(err) return done(err);

          request(sails.hooks.http.app)
          .post('/signup')
          .set('Accept', 'application/json')

          //.set('X-CSRF-Token', testCsrfToken)
          .send( user )
          .expect('Content-Type', /json/)
          .expect(400)
          .end(function (err, res) {
            if(err) return done(err);

            // TODO add suport for server messages
            should.not.exist(res.body.id);
            should.not.exist(res.body.email);

            // check if has a error message
            should.exist(res.body.error);
            should.exist(res.body.invalidAttributes);


            done();
          });
        });
      });

     it('/signup should create a user with correct data, return 201',function (done) {
        var user  = UserStub();
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

          // TODO add suport for server messages
          should(res.body).should.be.ok;
          should(res.body.id).should.be.ok;

          done();
        });

      });

      it('/users/logout should logout a user and return 200');

      it('/users/logout should logout a user, return 200 and redirect to index');

      it('/user/:id/password/send-token send a email with password change token');

      it('/user/:id/activate/:token activate and login user with activation token');

    });

    describe('PUT', function() {
      it('/user/:id/activate/:token activate a account with a valid token');
    });
  }); // end requests

  describe('Reset password', function(){
    var userInDB;
    var tokenInDB;

    before(function(done){
      User.create(UserStub(), function(err, user) {
        if(err) return done(err);
        userInDB = user;
        AuthToken.create({user_id: userInDB.id}, function(err, token) {
          if(err) return done(err);
          tokenInDB = token;
          done();
        });
      });
    });

    it('/auth/:uid/reset-password/:token should login user and return success message',function (done) {

      request(sails.hooks.http.app)
      .get('/auth/'+ userInDB.id + '/reset-password/' + tokenInDB.token)
      .set('Accept', 'application/json')
      //.set('X-CSRF-Token', testCsrfToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if(err){
          console.log(err);
          return done(err);
        }

        should.not.exist(err);
        should(res.body).ok;

        should(res.body).have.property('id', userInDB.id);

        done();
      });
    });
  });
});
