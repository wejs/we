
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var sinon   = require('sinon');

function PostStub () {
  return {
    title: 'A good post ô ',
    body: "Mussum ipsum cacilds, vidis litro abertis.<br>\nConsetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.<br>\nSuco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Interagi no mé, cursus quis, vehicula ac nisi. Aenean vel dui dui. Nullam leo erat, aliquet quis tempus a, posuere ut mi. Ut scelerisque neque et turpis posuere pulvinar pellentesque nibh ullamcorper. Pharetra in mattis molestie, volutpat elementum justo. Aenean ut ante turpis. Pellentesque laoreet mé vel lectus scelerisque interdum cursus velit auctor. Lorem ipsum dolor si"
  };
}

describe('PostController', function() {

  // JSON REQUESTS //
  describe('JSON Requests', function() {
    describe('GET', function() {
      it('/posts should return 200 and posts array');
    });
    describe('POST', function() {
      it('/posts should return 200 and new post object');

    });
    describe('PUT', function() {
     it('/posts/:id should return 200 and updated post object');

    });
    describe('DELETE', function() {
      it('/posts/:id should return 200');

    });
  }); // end requests

});
