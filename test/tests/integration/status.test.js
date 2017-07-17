const exec = require('child_process').exec,
  assert = require('assert'),
  path = require('path');

const rootP = process.cwd(),
  projectFolder = path.resolve(
    rootP, 'node_modules', 'we-project-blog-demo'
  );

describe('commands-status', ()=> {

  before( (done)=> {
    done();
  });

  it('Should list project features', (done)=> {
    exec(`${rootP}/bin/we status`, {
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

      //console.log(`${stdout}`);

      assert(stdout.indexOf('19 plugins') > -1, 'Should have 19 plugins');
      assert(stdout.indexOf('2 themes') > -1, 'Should have 2 themes');
      assert(stdout.indexOf('16 models') > -1, 'Should have 2 themes');
      assert(stdout.indexOf('14 controllers') > -1, 'Should have 14 controllers');

      done();
    });
  });

});


