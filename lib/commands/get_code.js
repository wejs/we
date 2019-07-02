/**
 * Resove rigth file and get code from we.js features:
 */

const fs = require('fs'),
  path = require('path');

module.exports = function getCodeCommand(program) {

  const helpers = require('../helpers');
  let we;

  program
  .command('get-code <featureType> <featureName>')
  .description('Get code from avaible feature')
  .action(function run(featureType, featureName) {
    we = helpers.getWe();

    we.bootstrap( (err, we)=> {
      if (err) return doneAll(err);

      let fnPath = path.resolve(__dirname, '..', 'get_code_fns', featureType + '.js');

      try {
        fs.readFileSync( fnPath );
      } catch(e) {
        console.log('get code not avaible for this feature type: '+ featureType);
        return doneAll();
      }

      let fn = require(fnPath);

      fn(we, featureType, featureName, (err, result)=> {
        if (err) return doneAll(err);
        console.log(result);

        doneAll();
      });
    });

    function doneAll(err) {
      if ( err ) {
        we.log.error('Error on get we.js get code command:', err);
      }
      // end / exit
      we.exit(process.exit);
    }
  });
};
