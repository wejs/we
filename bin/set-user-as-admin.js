var path = require('path');

module.exports = function run() {

  var projectFolder = process.cwd();
  var we = require( path.resolve( projectFolder, 'node_modules/we-core' ));

  we.bootstrap(function(err, we) {
    if (err) return doneAll(err);

    var uid = process.argv[3];
    if (! Number(uid) ) return doneAll('Invalid Uid');

    we.db.models.user.find(uid)
    .done( function (err, user) {
      if(err) return doneAll(err);

      // check if the role exists
      we.db.models.role.find({ where:
        { name: 'administrator' }
      }).done(function (err, role) {
        if (err) return doneAll(err);
        if (!role) return doneAll('administrator role not found');

        user.addRole(role).done(function(err) {
          if (err) return doneAll(err);

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