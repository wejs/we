var path = require('path');

module.exports = function run() {

  var projectFolder = process.cwd();
  var we = require( path.resolve( projectFolder, 'node_modules/we-core' ));

  we.bootstrap(function(err, we) {
    if (err) return doneAll(err);

    var uid = process.argv[3];
    if (! Number(uid) ) return doneAll('Invalid Uid');

    we.db.models.user.findById(uid)
    .then( function (user) {
      // check if the role exists
      we.db.models.role.find({ where:
        { name: 'administrator' }
      }).then(function (role) {
        if (!role) return doneAll('administrator role not found');
        user.addRole(role).then(function() {
          we.log.info('DONE role ' +role.name+ ' set to user ' +user.username);
          return doneAll();
        });
      });
    });
  });

  function doneAll(err) {
    if ( err ) {
      we.log.error('Error on set user as admin', err);
    }
    //sails.load();
    // end / exit
    process.exit();
  }
};