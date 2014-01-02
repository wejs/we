var should = require('should');
var request = require('supertest');
var sinon   = require('sinon');

function ExampleStub () {
  return {
    title: 'A good exaple ô ',
    body: "Mussum ipsum cacilds, vidis litro abertis."
  };
}

describe('Example', function() {

  // JSON REQUESTS //
  describe('JSON Requests', function() {
    describe('GET', function() {
      it('/examples should return 200 and examples array');
    });
    describe('POST', function() {
      it('/examples should return 200 and new example object');

    });
    describe('PUT', function() {
     it('/examples/:id should return 200 and updated example object');

    });
    describe('DELETE', function() {
      it('/examples/:id should return 200');
    });
  }); // end requests

});
    