var path = require('path');
var fs = require('fs');

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
  },
  checkIfAreInProject: function checkIfAreInProject() {
    var weCoreFolder = path.resolve( process.cwd(), 'node_modules/we-core' );
    try {
      return fs.statSync(weCoreFolder);
    } catch(e) {
      return false;
    }
  }
};