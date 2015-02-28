/**
 * We.js CLI generator a Wrapper of yeoman generator-wejs
 */

var loadGenerator = require('./yeoman/load-generator.js');

module.exports = function runTheGenerator() {
  loadGenerator(function(err, generator, opts) {
    var args = opts.argv.remain;

    if (args[1] === 'blog') {
      generator.run(['wejs:blog'], opts);
    } else if (args[1] === 'plugin') {
      generator.run(['wejs:plugin'], opts);
    } else if (args[1] === 'theme') {
      generator.run(['wejs:theme'], opts);
    } else {
      console.error('ERROR: Invalid generator option');
    }
  })
}


