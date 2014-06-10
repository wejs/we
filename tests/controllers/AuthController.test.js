
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
    User.destroy(function (err) {
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

              // check id user is salved
              should.exist(res.body.email);
              should.exist(res.body.id);

              // check if has a error message
              should.not.exist(res.body.error);
              should.not.exist(res.body.invalidAttributes);

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
        User.create(user, function(err, newUser) {
          if(err) return done(err);

          request(sails.hooks.http.app)
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

        request(sails.hooks.http.app)
        .post('/signup')
        .set('Accept', 'application/json')

        //.set('X-CSRF-Token', testCsrfToken)
        .send( user )
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          if(err) return done(err);

          // check id user is salved
          should.not.exist(res.body.email);
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
          // check id user is salved
          should.not.exist(res.body.email);
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
          should(res.body).have.properties({
            'email': user.email
          });

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
