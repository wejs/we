#!/usr/bin/env node

/**
 * Set user as admin with user id
 *
 */

var helpers = require('../lib/helpers');
var we;

module.exports = function run() {
  we = helpers.getWe();

  we.bootstrap(function(err, we) {
    if (err) return doneAll(err);

    console.log(we);

    var str = '';

    str += we.pluginNames.length +' plugins: \n' + we.pluginNames.join(' ');

    str += '\n\n';

    var themesLoaded = Object.keys(we.view.themes);
    str += themesLoaded.length + ' themes:\n' + themesLoaded.join(', ');

    str += '\n\n';

    var modelNames = Object.keys(we.db.models);
    str += modelNames.length + ' models:\n' + modelNames.join(', ');

    str += '\n\n';

    var consollerNames = Object.keys(we.controllers);
    str += consollerNames.length + ' controllers:\n' + consollerNames.join(', ');

    str += '\n\n';

    var rTypeNames = Object.keys(we.responses.formaters);
    str += rTypeNames.length + ' response types (formaters):\n' + rTypeNames.join(', ');

    str += '\n\n';

    var methodNames = Object.keys(we.responses.methods);
    str += methodNames.length + ' response methods:\n' + methodNames.join(', ');

    str += '\n\n';

    var utilNames = Object.keys(we.utils);
    str += utilNames.length + ' utils:\n' + utilNames.join(', ');

    str += '\n\n';

    var rootAttrNames = Object.keys(we);
    str += 'Attrs: \nwe.' + rootAttrNames.join(' we.');

    console.log(str);

    doneAll();
  });

  function doneAll(err) {
    if ( err ) {
      we.log.error('Error on get we.js project status:', err);
    }
    // end / exit
    we.exit(function () { process.exit(); });
  }
};