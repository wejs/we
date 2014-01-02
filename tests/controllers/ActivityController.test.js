var should = require('should');
var request = require('supertest');
var sinon   = require('sinon');

function ActivityStub () {
  return {
    title: 'A good exaple ô ',
    body: "Mussum ipsum cacilds, vidis litro abertis."
  };
}

describe('Activity', function() {

  // JSON REQUESTS //
  describe('JSON Requests', function() {
    describe('GET', function() {
      it('/activities should return 200 and activities array');
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

});
    