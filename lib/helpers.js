var path = require('path');
var fs = require('fs');

module.exports = {
  getWe: function getWe() {
    try {
      var projectFolder = process.cwd();
      var We = require( path.resolve( projectFolder, 'node_modules/we-core' ));
      return new We();
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
  },
  notInProjectError: function notInProjectError() {
    console.error(
      'we-core not found, possible problems: \n\n'+
      '1- run "npm install" for install we-core and others dependencies in your project\n'+
      '2- "we run" we.js cli command only works in project folder\n'
    );
  }
};