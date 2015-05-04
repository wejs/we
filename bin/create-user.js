/**
 * Script to generate one user
 */
var path = require('path');

module.exports = function run() {

  var projectFolder = process.cwd();
  var we = require( path.resolve( projectFolder, 'node_modules/we-core' ));


  var sget = require('sget');

  var userStub = {
    username: 'administrator',
    biography: 'Administrator is the first user!',
    email: 'contato@albertosouza.net',
    password: '123',
    displayName: 'Administrator',
    language: 'pt-br',
    active: true
  };

  we.bootstrap(function(err, we) {
    if (err) return doneAll(err);

    we.log.info('-');
    we.log.info('--');
    we.log.info('--- User creation: ----');
    we.log.info('--');
    we.log.info('-');

    // alows user set new user data
    whantsSendUserData = sget('Do you what set user data?. \n y or n?');
    // remove \n
    whantsSendUserData = whantsSendUserData.replace('\n','');


    if ( whantsSendUserData === 'y') {
      userStub.displayName = sget('What is the displayName?');
      userStub.displayName = userStub.displayName.replace('\n','');
      userStub.username = sget('What is the username?');
      userStub.username = userStub.username.replace('\n','');
      userStub.email = sget('What is the email?');
      userStub.email = userStub.email.replace('\n','');
      userStub.password = sget('What is the password?');
      userStub.password = userStub.password.replace('\n','');
    }

    we.log.info('I will create the user: ', userStub);

    we.db.models.user.create(userStub)
    .done(function (err, user) {
      if (err) return doneAll(err);

      we.log.info('New User: ', user.get());

      user.updatePassword(userStub.password , function(error) {
        if (error) return doneAll(error);

        return doneAll();
      });

    });
  });


  function doneAll(err) {
    if ( err ) {
      we.log.error('Error on create user:', err);
    }

    we.exit(function () {
      // end / exit
      process.exit();
    });
  }
}