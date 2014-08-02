var should = require('should');
var request = require('supertest');
var sinon   = require('sinon');

function CommentStub () {
  return {
    title: 'A good exaple ô ',
    body: "Mussum ipsum cacilds, vidis litro abertis."
  };
}

describe('CommentController', function() {

  // JSON REQUESTS //
  describe('JSON Requests', function() {
    describe('GET', function() {
      it('/comments should return 200 and all comments array');
      it('/:parent/:pid/comments should return 200 and all comments array');
      it('/:parent/:pid/comments/:id should return 200 and one comment');

    });
    describe('POST', function() {
      it('/comments should return 201 and new comment object');

    });
    describe('PUT', function() {
     it('/comments/:id should return 200 and updated comment object');

    });
    describe('DELETE', function() {
      it('/comments/:id should return 200');
    });
  }); // end requests

});
    