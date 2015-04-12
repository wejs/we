var path = require('path');
var async = require('async');
var sget = require('sget');
var Chancejs = require('chance');
// Instantiate Chance so it can be used
var chancejs = new Chancejs();

var we, user, vocabulary, group;

module.exports = function run() {

  var projectFolder = process.cwd();
  we = require( path.resolve( projectFolder, 'node_modules/we-core' ));

  we.bootstrap(function(err) {
    if (err) return doneAll(err);

    async.series([
      createUser,
      setUserAsAdmin,
      createVocabulary,
      createCategories,
      createGroup
    ],doneAll);

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
};

function createUser(done) {
  we.db.models.user.find(1)
  .then(function(u) {
    if (u) {
      we.log.info('User 1 already exists, i will ise it: ', u.get());
      user = u;
      return done();
    }

    var userStub = {
      username: 'afrosamuray',
      biography: 'Afro Samuray is a hero how helps people!',
      email: 'contato@albertosouza.net',
      password: '123',
      displayName: 'Afro Samuray',
      language: 'pt-br',
      active: true
    };

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
    .done(function (err, u) {
      if (err) return done(err);

      we.log.info('New User with id: ', u.id);

      user = u;

      u.updatePassword(userStub.password , function(error) {
        if (error) return done(error);

        return done();
      });
    });


  }).catch(done);
}

function setUserAsAdmin(done) {
  // check if the role exists
  we.db.models.role.find({ where:
    { name: 'administrator' }
  }).done(function (err, role) {
    if (err) return doneAll(err);
    if (!role) return doneAll('administrator role not found');

    user.addRole(role).done(function(err) {
      if (err) return done(err);
      we.log.info('DONE role ' +role.name+ ' set to user ' +user.username);
      return done();
    });
  });
}


function createVocabulary(done) {
  we.db.models.vocabulary.find(1)
  .then(function(v){
    if (v) {
      vocabulary = v;
      return done();
    }
    we.db.models.vocabulary.create({
      creatorId : user.id,
      name: chancejs.word(),
      description: chancejs.paragraph({sentences: 5})
    }).done(function (err, v){
      if (err) return done(err);
      vocabulary = v;
      done();
    });
  }).catch(done);
}

function createCategories(done) {
  we.db.models.term.bulkCreate([
    {
      text: 'Saúde',
      description: chancejs.paragraph({sentences: 5}),
      vocabularyId: vocabulary.id
    },
    {
      text: 'Entreterimento',
      description: chancejs.paragraph({sentences: 5}),
      vocabularyId: vocabulary.id
    },
    {
      text: 'Universe',
      description: chancejs.paragraph({sentences: 5}),
      vocabularyId: vocabulary.id
    }
  ])
  .done(done);
}

function createGroup(done) {
  we.db.models.group.create({
    creatorId : user.id,
    name: chancejs.sentence({words: 4}),
    description: chancejs.paragraph({sentences: 5}),
    tags: [
      'Futebol',
      'Jogo',
      'Jogador'
    ],
    categories: [
      'Saúde',
      'Entreterimento'
    ]
  })
  .done(function (err, g) {
    if (err) return done(err);
    group = g;

    we.db.models.activity.create({
      modelName: 'group',
      modelId: g.id,
      actor: user.id,
      action: 'create',
      groupId: g.id
    }).then(function () {
      done();
    }).catch(done);
  });
}