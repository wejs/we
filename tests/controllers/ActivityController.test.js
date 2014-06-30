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
    "body": "one post here " + uuid.v1(),
    "creator": uid
  };
}

function UserStub () {
  return {
    Username: uuid.v1(),
    name: "Alberto",
    email: uuid.v1() + "@albertosouza.net",
    password: uuid.v1()
  };
}

describe('Activity', function() {

  var UserSaved;
  // before create one User and some activities
  before(function (done) {
    var newUser = UserStub();

    // create one User
    User.create(newUser, function(err, User) {
      if(err){
        console.log(err);
        return done(err);
      }

      UserSaved = User;

      var newPostlist = [];

      // create 3 posts
      newPostlist[0] = PostsStub(User.id);
      newPostlist[1] = PostsStub(User.id);
      newPostlist[2] = PostsStub(User.id);

      Post.createEach(newPostlist).exec(function(error, newPost) {
        if (error) {
          console.log(error);
          return done(error);
        }

        done();
      });

    });
  });

  // JSON REQUESTS //
  describe('JSON Requests', function() {
    describe('GET', function() {

      it('/activity should return 200 and activities array', function (done) {

        request(sails.hooks.http.app)
        .get('/activity')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if(err) return done(err);

            res.body.should.have.length(3);
            res.body.should.be.an.instanceOf(Array);

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

    User.destroy();
    Post.destroy();
    Activity.destroy();

    done();
  });

});
