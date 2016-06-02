module.exports = function csetCommand(program) {
  /**
   * Set project variables in configs/configuration.json
   */

  var path = require('path');
  var jsonfile = require('jsonfile');
  var _ = require('lodash');
  var fs = require('fs');

  program
  .command('vset <variable> <value>')
  .description('Set project variables in configs/configuration.json')
  .action( function run(variable, value) {
    var cJSON;
    var cFGpath = path.join(process.cwd(), '/config/configuration.json');

    try {
      cJSON = JSON.parse(fs.readFileSync(cFGpath));
    } catch(e) {
      if (e.code == 'ENOENT') {
        fs.writeFileSync(cFGpath, '{}');
        cJSON = {};
      } else {
        throw e;
      }
    }

    if (value == 'true') value = true;
    if (value == 'false') value = false;

    _.set(cJSON, variable, value);

    jsonfile.writeFile(cFGpath , cJSON, { spaces: 2 }, function(err) {
      if (err) throw err;
      // console.log('done');
    });
  });
}
