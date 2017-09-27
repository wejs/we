const exec = require('child_process').exec,
  assert = require('assert'),
  path = require('path');

const rootP = process.cwd(),
  projectFolder = path.resolve(
    rootP, 'node_modules', 'we-project-blog-demo'
  );

describe('commands-record:find', ()=> {

  before( (done)=> {
    done();
  });

  it('Should find one user record', (done)=> {
    exec(`${rootP}/bin/we record:find user`, {
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

      assert(stdout.indexOf('id: 1,') >-1);
      assert(stdout.indexOf('username: \'administrator\',') >-1);

      done();
    });
  });

  it('Should find one user record with its id', (done)=> {
    exec(`${rootP}/bin/we record:find vocabulary 1`, {
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

      assert(stdout.indexOf('id: 1,') >-1);
      assert(stdout.indexOf('name: \'Tags\',') >-1);

      done();
    });
  });

  it('Should find one user record with rf', (done)=> {
    exec(`${rootP}/bin/we record:find user`, {
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

      assert(stdout.indexOf('id: 1,') >-1);
      assert(stdout.indexOf('username: \'administrator\',') >-1);

      done();
    });
  });
});


