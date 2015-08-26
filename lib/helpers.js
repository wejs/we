var path = require('path');

module.exports = {
  getWe: function getWe() {
    try {
      var projectFolder = process.cwd();
      var we = require( path.resolve( projectFolder, 'node_modules/we-core' ));
      return we;
    } catch(e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        console.error('we-core not found, we.js cli only works in project folder');
        process.exit();
      } else {
        throw e;
      }
    }
  }
};