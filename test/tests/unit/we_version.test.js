var assert = require('assert');

describe('we version', function () {
  var packageJSON = require('../../../package.json');
  var commandPath = process.cwd() + '/bin/we';

  it('should show package.json version', function (done) {
		var exec = require('child_process').exec;
		var child = exec(commandPath+' version', function (error, stdout, stderr) {
	    if (error) return done(error);

	    assert.equal(packageJSON.version+'\n', stdout);

	    done();
		});  	
  });
});