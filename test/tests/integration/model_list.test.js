const exec = require('child_process').exec,
  assert = require('assert'),
  path = require('path');

const rootP = process.cwd(),
  projectFolder = path.resolve(
    rootP, 'node_modules', 'we-project-blog-demo'
  );

describe('commands-model:list', ()=> {

  before( (done)=> {
    done();
  });

  it('Should list project models and its attributes', (done)=> {
    exec(`${rootP}/bin/we model:list`, {
      env: {
        NODE_ENV: 'development',
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
      },
      cwd: projectFolder
    }, (error, stdout, stderr)=> {
      if (error) {
        console.error(`exec error: ${error}`);
      }

      if (stderr) console.log(`${stderr}`);

      // console.log(`${stdout}`);

      assert(stdout.indexOf(`plugin:
  Attributes:
    id: INTEGER
    filename: VARCHAR(1000)
    name: VARCHAR(255)
    type: VARCHAR(12)
    status: INTEGER
    version: VARCHAR(10)
    weight: INTEGER
    info: TEXT
    createdAt: DATETIME
    updatedAt: DATETIME
`) > -1, 'Should show plugin model attributes');

      assert(stdout.indexOf(`vocabulary:
  Attributes:
    id: INTEGER
    name: VARCHAR(255)
    description: TEXT
    linkPermanent: VIRTUAL
    metadata: VIRTUAL
    createdAt: DATETIME
    updatedAt: DATETIME
    creatorId: INTEGER
  Associations:
    creator:BelongsTo -> user
`) > -1, 'Should show vocabulary model attributes');

      assert(stdout.indexOf(`user:
  Attributes:
    id: INTEGER
    username: VARCHAR(255)
    displayName: VARCHAR(255)
    fullName: TEXT
    biography: TEXT
    gender: VARCHAR(255)
    email: VARCHAR(255)
    active: TINYINT(1)
    language: VARCHAR(255)
    confirmEmail: VIRTUAL
    acceptTerms: TINYINT(1)
    roles: TEXT
    organization: VIRTUAL
    linkPermanent: VIRTUAL
    metadata: VIRTUAL
    createdAt: DATETIME
    updatedAt: DATETIME
`) > -1, 'Should show user model attributes');

      done();
    });
  });

  it('Should run with ml alias and list project features', (done)=> {
    exec(`${rootP}/bin/we ml`, {
      env: {
        NODE_ENV: 'development',
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
      },
      cwd: projectFolder
    }, (error, stdout, stderr)=> {
      if (error) {
        console.error(`exec error: ${error}`);
      }

      if (stderr) console.log(`${stderr}`);

      // console.log(`${stdout}`);

      assert(stdout.indexOf(`plugin:
  Attributes:
    id: INTEGER
    filename: VARCHAR(1000)
    name: VARCHAR(255)
    type: VARCHAR(12)
    status: INTEGER
    version: VARCHAR(10)
    weight: INTEGER
    info: TEXT
    createdAt: DATETIME
    updatedAt: DATETIME
`) > -1, 'Should show plugin model attributes');

      assert(stdout.indexOf(`vocabulary:
  Attributes:
    id: INTEGER
    name: VARCHAR(255)
    description: TEXT
    linkPermanent: VIRTUAL
    metadata: VIRTUAL
    createdAt: DATETIME
    updatedAt: DATETIME
    creatorId: INTEGER
  Associations:
    creator:BelongsTo -> user
`) > -1, 'Should show vocabulary model attributes');

      assert(stdout.indexOf(`user:
  Attributes:
    id: INTEGER
    username: VARCHAR(255)
    displayName: VARCHAR(255)
    fullName: TEXT
    biography: TEXT
    gender: VARCHAR(255)
    email: VARCHAR(255)
    active: TINYINT(1)
    language: VARCHAR(255)
    confirmEmail: VIRTUAL
    acceptTerms: TINYINT(1)
    roles: TEXT
    organization: VIRTUAL
    linkPermanent: VIRTUAL
    metadata: VIRTUAL
    createdAt: DATETIME
    updatedAt: DATETIME
`) > -1, 'Should show user model attributes');

      done();
    });
  });

});


