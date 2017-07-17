/**
 * test we routes command that should show all project routes with support to filters
 */

const exec = require('child_process').exec,
  assert = require('assert'),
  path = require('path');

const rootP = process.cwd(),
  projectFolder = path.resolve(
    rootP, 'node_modules', 'we-project-blog-demo'
  );

describe('commands-routes', ()=> {

  before( (done)=> {
    done();
  });

  it('Should list all project routes', (done)=> {
    exec(`${rootP}/bin/we routes`, {
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

      assert(stdout.indexOf(`│ post   │ portfolio        │ portfolio     │ /portfolio/:portfolioId([0-9]+)/edit                       │
`) > -1, 'Should have update portofolio route');

      assert(stdout.indexOf(`│ get    │ user             │ user          │ /user/:userId([0-9]+)                                      │
`) > -1, 'Should have the find one user route');

      assert(stdout.indexOf(`│ get    │ vocabulary       │ term          │ /vocabulary/:vocabularyId/tag-clound                       │
`) > -1, 'Should have the tag clound route');

      done();
    });
  });

  it('Should list all project routes with r command', (done)=> {
    exec(`${rootP}/bin/we r`, {
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

      assert(stdout.indexOf(`│ post   │ portfolio        │ portfolio     │ /portfolio/:portfolioId([0-9]+)/edit                       │
`) > -1, 'Should have update portofolio route');

      assert(stdout.indexOf(`│ get    │ user             │ user          │ /user/:userId([0-9]+)                                      │
`) > -1, 'Should have the find one user route');

      assert(stdout.indexOf(`│ get    │ vocabulary       │ term          │ /vocabulary/:vocabularyId/tag-clound                       │
`) > -1, 'Should have the tag clound route');

      done();
    });
  });

  it('Should list only user routes', (done)=> {
    exec(`${rootP}/bin/we routes -c user`, {
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

      assert(stdout.indexOf(`│ get    │ user             │ user          │ /user/:userId([0-9]+)                                      │
`) > -1, 'Should have the find one user route');

      assert(stdout.indexOf(`│ get    │ vocabulary       │ term          │ /vocabulary/:vocabularyId/tag-clound                       │
`) === -1, 'Should not have the tag clound route');

      done();
    });
  });
});


