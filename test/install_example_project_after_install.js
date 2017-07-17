// install_example_project_after_install

const exec = require('child_process').exec,
  path = require('path');

const rootP = process.cwd(),
  projectFolder = path.resolve(
  rootP, 'node_modules', 'we-project-blog-demo'
);

if (
  process.env.NODE_ENV !== 'production' &&
  process.env.ENV !== 'production'
) {
  console.log('> Installing node_modules/we-project-blog-demo sub modules for tests');
  exec(`npm install`, {
    cwd: projectFolder
  }, (error, stdout, stderr)=> {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`${stdout}`);
    if (stderr) console.log(`${stderr}`);
  });
}