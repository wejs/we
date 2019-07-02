const fs = require('fs');

function getCode(we, featureType, featureName, cb) {
  if (!we.view) {
    return cb(null, 'we.view not avaible, check if we-plugin-view is installed');
  }

  if (!we.view.configuration.helpers) {
    return cb(null, 'This project dont have helpers avaible');
  }

  if ( !we.view.configuration.helpers[featureName] ) {
    return cb(null, 'Helper not found');
  }

  fs.readFile(we.view.configuration.helpers[featureName], 'utf8', cb);
}

module.exports = getCode;