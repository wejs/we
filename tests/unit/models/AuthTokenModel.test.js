/**
 * Model tests
 */

var should = require('should');
var assert = require('assert');
var supertest = require('supertest');
var uuid = require('node-uuid');

var testUtils = require('../../testUtils.js');

function UserStub () {
  return {
    username: 'GNU/Linux',
    name: "linux",
    email: "linux@albertosouza.net",
    password: "321",
    sharedWithMe: []
  };
}

describe('AuthTokenModel', function() {

  // user to use uid in token creation
  var userSaved;

  before(function(done){
    User.create(UserStub(), function(err, user) {
      if(err) return done(err);

      userSaved = user;
      done();
    });
  });

  // after(function(done){
  //   testUtils.emptyDatabase(done);
  // });

  afterEach(function(done){
    AuthToken.destroy(function (err) {
      if(err) {
        console.error('error:', err);
        return done(err);
      }
      done();
    } );
  });

  describe('Create', function() {
    it("Should be able to create a new token", function(done) {
      AuthToken.create({user_id: userSaved.id}, function(err, token) {
        if(err){
          console.error(err);
        }

        should.not.exist(err);

        should.exist(token);
        should(token).have.property('user_id', userSaved.id);
        should(token).have.property('isValid', true);
        should.exist(token.token);

        done();
      });
    });

    it("Should invalid old tokens before create new token", function(done) {
      // create first token
      AuthToken.create({user_id: userSaved.id}, function(err, tokenOld) {
        if(err){
          console.error(err);
          return done(err);
        }

        should.exist(tokenOld);
        // create a seccond token
        AuthToken.create({user_id: userSaved.id}, function(err, token) {
          if(err){
            console.error(err);
            return done(err);
          }

          should.exist(token);
          // check if only last token is valid
          AuthToken.find()
          .where({isValid: true})
          .exec(function(err, tokens){
            if(err){
              console.error(err);
              return done(err);
            }

            should.exist(tokens);
            tokens.should.be.instanceof(Array).and.have.lengthOf(1);
            should(tokens[0]).have.property('user_id', userSaved.id);
            should(tokens[0]).have.property('isValid', true);
            should(tokens[0]).have.property('token', token.token);

            done();
          });

        });

      });

    });

  });

  describe('Valid AuthToken', function() {
    it("Should valid a isValid auth token", function(done) {
      AuthToken.create({user_id: userSaved.id}, function(err, token) {
        if(err){
          console.error(err);
          return next(err);
        }

        should.exist(token);

        AuthToken.validAuthToken(userSaved.id, token.token, function(err, isValid, tokenReturned){
          if(err){
            console.error(err);
          }

          should.not.exist(err);

          should(isValid).ok;
          // this token is valided
          isValid.should.be.true;

          should.exist(tokenReturned);

          should(tokenReturned).have.property('user_id', token.user_id);
          should(tokenReturned).have.property('token', token.token);

          // is valid will be false now because token is already used
          should(tokenReturned).have.property('isValid', false);

          done();
        });

      });

    });
  });
});

