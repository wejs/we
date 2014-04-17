/**
 * Model tests
 */

var should = require('should');
var assert = require('assert');
var supertest = require('supertest');
var uuid = require('node-uuid');

function UserStub () {
  return {
    username: 'GNU/Linux',
    name: "linux",
    email: "linux@albertosouza.net",
    password: "321"
  };
}

describe('UsersModel', function() {

  afterEach(function(done){
    // remove all users after each test block
    Users.destroy(function (err) {
      if(err) return done(err);
      done();

    } );
  });

  describe('Create', function() {


    it("Should be able to create a user", function(done) {
      Users.create(UserStub(), function(err, user) {
        if(err) return done(err);
        assert.notEqual(user, undefined);
        done();
      });
    });

    it("Should return error on create user with already registered email", function(done) {
      var newUser = UserStub();

      // first create one user
      Users.create(newUser, function(err, userCreated) {
        if(err) return done(err);

        Users.create(newUser, function(err, user) {
          err.should.not.be.empty;
          err.should.equal(
            'Uniqueness check failed on attribute: email with value: ' + newUser.email
          );
          assert.equal(user, undefined);
          done();
        });

      });
    });

  });


  describe('Find', function() {
    var userSaved;

    before(function (done) {
      var newUser = UserStub();
      // create one user
      Users.create(newUser, function(err, user) {
        if(err) return done(err);

        userSaved = user;
        done();
      });
    });

    it("Should find by id and return one user object ", function(done) {
      var user;

      Users.findOneById(userSaved.id).done(function(err, user){
        if(err) return done(err);

        should.exist(user);
        user.should.be.an.instanceOf(Object);
        user.should.have.property('email', userSaved.email);
        user.should.have.property('name', userSaved.name);
        user.should.have.property('id', userSaved.id);

        done();
      });
    });

  });

  describe('Update', function() {

    var userSaved;

    before(function (done) {
      var newUser = UserStub();
      // create one user
      Users.create(newUser, function(err, user) {
        if(err) return done(err);

        userSaved = user;
        done();
      });
    });


    it("Should update one user by id", function(done) {
      var userDataToUpdate = {
        name: uuid.v1()
      };

      Users.update({
        id: userSaved.id
      }, userDataToUpdate ).done(function (err, users) {
        if(err) return done(err);
     
        users.should.be.instanceof(Array);
        users.should.have.lengthOf(1);
        
        users[0].should.be.instanceof(Object);
        // check if are same user
        users[0].should.have.property('id', userSaved.id);
        // check if is updated
        users[0].should.include(userDataToUpdate);

        done();

      });
    });

    it("Should update a user password");

    it("Should update a user config");


  });

  describe('Delete', function() {
    var userSaved;

    before(function (done) {
      var newUser = UserStub();
      // create one user
      Users.create(newUser, function(err, user) {
        if(err) return done(err);

        userSaved = user;
        done();
      });
    });

    it("Should delete user by id", function(done) {
      Users.destroy({
        id: userSaved.id
      }).done(function (err) {
        if(err) return done(err);

        Users.findOneById(userSaved.id).done(function(err, user){
          if(err) return done(err);
          
          should.not.exist(user);

          done();
        });

      });
    });

  });
});

