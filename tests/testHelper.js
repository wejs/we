/**
 * Script how runs before all tests
 * Use it to preload some dependences for tests
 */

require('should');
var request = require('supertest');

// TODO move this database config to sails config/local.js
global.gettestConfig= function(done) {

  //var localConf = require('../config/local');

  // TODO: Create the database
  // Database.createDatabase.....

  return {

    log: {
      level: 'error'
    },

    adapters: {
      'default': 'memory',

      memory: {
        module: 'sails-memory'
      }
    },
    port: 1330,
    environment: 'test',
    // @TODO needs suport to csrf token
    csrf: false
  };

};

global.getApp = function(cb){

};

global.testCsrfToken = null;

global.getTestCsrfToken = function (cb) {
  if(testCsrfToken) {
    cb(null, testCsrfToken);
  }else {
    request(sails.hooks.http.app)
      .get('/csrfToken')
      .end(function (err, res) {
        var csrf;

        if(res.body._csrf) {
          csrf = res.body._csrf;
          testCsrfToken = res.body._csrf;
        } else {
          err = 'cant get csrf token';
        }
        // TODO implement response data check
        //res.body.users.should.be.an.instanceOf(Array);
        cb(err, res.body._csr);
    });
  }


};
