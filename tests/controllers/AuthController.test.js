
var should = require('should');
var request = require('supertest');
var sinon   = require('sinon');
var uuid = require('node-uuid');

function UserStub () {
    return {
      username: uuid.v1(),
      name: "Alberto",
      email: 'alberto.souza.99@gmail.com',
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
      /*
      it('/users/login should return 401 with wrong password message',function (done) {
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
      */
      it('/signup when confirmPassword is diferent than password return 400 with error message',function (done) {
        var user  = UserStub();

        user.confirmPassword = 'a diferent password';

        request(sails.express.app)
        .post('/signup')
        .set('Accept', 'application/json')

        //.set('X-CSRF-Token', testCsrfToken)
        .send( user )
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          if(err) return done(err);
          // TODO add suport for server messages
          should.not.exist(res.body.email);
          should.not.exist(res.body.responseMessage.success);
          should.exist(res.body.responseMessage.errors);

          should.exist(res.body.responseMessage.errors[0].message);
          res.body.responseMessage.errors[0]['type'].should.be.equal('validation');
          res.body.responseMessage.errors[0].field.should.be.equal('password');

          done();
        });

      });

      it('/signup when dont have password return 400 with error message',function (done) {
        var user  = UserStub();

        delete(user.password);

        request(sails.express.app)
        .post('/signup')
        .set('Accept', 'application/json')

        //.set('X-CSRF-Token', testCsrfToken)
        .send( user )
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          if(err) return done(err);
          // TODO add suport for server messages
          should.not.exist(res.body.email);
          should.not.exist(res.body.responseMessage.success);
          should.exist(res.body.responseMessage.errors);
          should.exist(res.body.responseMessage.errors[0].message);
          res.body.responseMessage.errors[0]['type'].should.be.equal('validation');
          res.body.responseMessage.errors[0].field.should.be.equal('password');

          res.body.responseMessage.errors[1]['type'].should.be.equal('validation');
          res.body.responseMessage.errors[1].field.should.be.equal('confirmPassword');
          done();
        });

      });

      it('/signup when email has a wrong format 403 with error message',function (done) {
        var user  = UserStub();

        user.email = 'a wrong email';
        user.confirmPassword = user.password;

        request(sails.express.app)
        .post('/signup')
        .set('Accept', 'application/json')

        //.set('X-CSRF-Token', testCsrfToken)
        .send( user )
        .expect('Content-Type', /json/)
        .expect(403)
        .end(function (err, res) {
          if(err) return done(err);

          // TODO add suport for server messages
          should.not.exist(res.body.email);
          should.not.exist(res.body.responseMessage.success);

          should.exist(res.body.responseMessage.errors[0].message);
          res.body.responseMessage.errors[0]['type'].should.be.equal('validation');
          res.body.responseMessage.errors[0].field.should.be.equal('email');

          // TODO handle tests with translations

          done();
        });

      });

      it('/signup should return 403 if email is already registered with error message',function (done) {

        var user = UserStub();
        user.confirmPassword = user.password;
        var salvedUser = sails.util.clone(user);

        Users.create(salvedUser, function(err, userCreated){
          if(err) return done(err);

          request(sails.express.app)
          .post('/signup')
          .set('Accept', 'application/json')

          //.set('X-CSRF-Token', testCsrfToken)
          .send( user )
          .expect('Content-Type', /json/)
          .expect(403)
          .end(function (err, res) {
            if(err) return done(err);

            // TODO add suport for server messages
            should.not.exist(res.body.user);
            should.not.exist(res.body.responseMessage.success);

            res.body.responseMessage.errors[0]['field'].should.be.equal('email');
            res.body.responseMessage.errors[0]['type'].should.be.equal('validation');
            should.exist(res.body.responseMessage.errors[0].message);
            // TODO handle tests with translations

            done();
          });
        });
      });

     it('/signup should create a user with correct data, return 201',function (done) {
        var user  = UserStub();
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

          // TODO add suport for server messages
          should.exist(res.body.responseMessage);
          should.exist(res.body.responseMessage.success);

          should.not.exist(res.body.responseMessage.errors);

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
});
