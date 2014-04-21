var should = require('should');
var request = require('supertest');
var sinon   = require('sinon');
var uuid = require('node-uuid');

function ActivityStub () {
  return {
    title: 'A good exaple ô ',
    body: "Mussum ipsum cacilds, vidis litro abertis."
  };
}

function PostsStub(uid) {
  return {
    "text": "one post here " + uuid.v1(),
    "creator": uid
  };
}

function UserStub () {
  return {
    username: uuid.v1(),
    name: "Alberto",
    email: uuid.v1() + "@albertosouza.net",
    password: uuid.v1()
  };
}

describe('Activity', function() {

  var userSaved;
  // before create one user and some activities
  before(function (done) {
    var newUser = UserStub();

    // create one user
    Users.create(newUser, function(err, user) {
      if(err) return done(err);

      userSaved = user;

      var newPostlist = [];

      // create 3 posts
      newPostlist[0] = PostsStub(user.id);
      newPostlist[1] = PostsStub(user.id);
      newPostlist[2] = PostsStub(user.id);

      Post.createEach(newPostlist).exec(function(error, newPost) {
        if (error) {
          return done(error);
        }

        done();
      });

    });
  });

  // JSON REQUESTS //
  describe('JSON Requests', function() {
    describe('GET', function() {

      it('/activities should return 200 and activities array', function (done) {

        request(sails.hooks.http.app)
        .get('/activity')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if(err) return done(err);
          // TODO add suport for server messages
          should.exist(res.body.items);
          res.body.items.should.have.lengthOf( 3 );
          res.body.items[0].actor.objectType.should.be.equal('person');

          done();
        });

      });

    });
    describe('POST', function() {
      it('/activities should return 201 and new activity object');

    });
    describe('PUT', function() {
     it('/activities/:id should return 200 and updated activity object');

    });
    describe('DELETE', function() {
      it('/activities/:id should return 200');
    });
  }); // end requests


  // after clear the database
  after(function (done) {

    Users.destroy();
    Post.destroy();
    Activity.destroy();

    done();
  });

});
