module.exports = function uliCommand(program) {
  /**
   * Get one time login link for one user by user id
   */

  var helpers = require('../helpers');
  var we;

  program
  .command('uli [id]')
  .description('Get one time login url')
  .action(function run() {
    we = helpers.getWe();

    we.bootstrap(function(err, we) {
      if (err) return doneAll(err);

      var uid = process.argv[3];
      if (! Number(uid) ) return doneAll('Invalid Uid');

      we.db.models.user.findById(uid)
      .then( function (user) {
        we.db.models.authtoken.create({
          'userId': user.id,
          tokenType: 'resetPassword'
        }).then(function (token) {
          if (!token) {
            return doneAll('unknow error on create auth token');
          }

          we.log.info('resetUrl>>', token.getResetUrl());
          return doneAll();
        });
      });
    });

    function doneAll(err) {
      if ( err ) {
        we.log.error('Error get user login link', err);
      }
      // end / exit
      process.exit();
    }
  });
}