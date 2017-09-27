/**
 * Helpers file with usefull functions
 */

const path = require('path'),
  fs = require('fs');

/**
 * Helpers object that are exported
 * @type {Object}
 */
const helpers = {
  cliTable: require('cli-table'),
  /**
   * Get current project We.js instance
   *
   * @param  {Object} opts options passed to we-core
   * @return {Object} We.js instance
   */
  getWe(opts) {
    let projectFolder, We;

    try {
      projectFolder = process.cwd();
      We = require( path.resolve( projectFolder, 'node_modules/we-core' ));
      return new We(opts);
    } catch(e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        console.error('we-core not found, this we.js cli command only works in project folder');
        process.exit();
      } else {
        throw e;
      }
    }
  },
  /**
   * Check if the terminal are in project folder
   * @return {boolean}
   */
  checkIfAreInProject() {
    const weCoreFolder = path.resolve( process.cwd(), 'node_modules/we-core' );
    try {
      return fs.statSync(weCoreFolder);
    } catch(e) {
      return false;
    }
  },
  /**
   * Error to show if run the we command youtside one we.js project
   */
  notInProjectError() {
    console.error(
      'we-core not found, possible problems: \n\n'+
      '1- run "npm install" for install we-core and others dependencies in your project\n'+
      '2- "we run" we.js cli command only works in project folder\n'
    );
  },
  /**
   * Load cli commands from we cli module folder
   * @return {Array}
   */
  loadCLICommands() {
    const dir = path.join(__dirname, 'commands');
    return this.loadCommands(dir);
  },
  /**
   * Load project commands
   * @return {Array}
   */
  loadProjectCommands() {
    const dir = path.join(process.cwd(), 'commands');
    return this.loadCommands(dir);
  },
  /**
   * Load project plugins commands from each plugin commmands folder
   * @return {[type]} [description]
   */
  loadProjectPluginsCommands() {
    const pluginList = this.getPluginsList(),
      plugins = {};

    if (pluginList) {
      for (let i = 0; i < pluginList.length; i++) {
        plugins[pluginList[i]] = this.loadCommands(pluginList[i]);
      }
    }

    return plugins;
  },
  /**
   * Method do load We.js CLI commands from  folder
   * @param  {string} dir folder
   * @return {Array}
   */
  loadCommands(dir) {
    const commands = [];

    try {
      fs.readdirSync(dir).forEach((fileName)=> {
        if (fileName.endsWith('.js')) {
          commands.push(require(path.join(dir, fileName)));
        }
      });
    } catch(e) {
      if (e.code !== 'ENOENT') throw e;
    }

    return commands;
  },
  /**
   * run command methods get from many locations with functions above
   * @param  {Array} commands
   * @param  {Object} program
   */
  runCommandFNs(commands, program) {
    let i;
    // cli
    commands.cli.forEach( (pf)=> {
      pf(program, helpers);
    });
    // project
    commands.project.forEach((pf)=> {
      pf(program, helpers);
    });
    // plugins
    for(let pluginName in commands.plugins) {
      for (i = 0; i < commands.plugins[pluginName].length; i++) {
        commands.plugins[pluginName][i](program, helpers);
      }
    }
  },
  /**
   * Method to det plugins list
   * @return {Array} plugins list
   */
  getPluginsList() {
    let nodeModulesPath = path.join(process.cwd(),'node_modules');
    let folders;

    try {
      folders = fs.readdirSync(nodeModulesPath);

      return folders
        .filter( (f)=> {
          if (
            f.substring(0, 3) === 'we-' &&
            isPlugin(path.join(nodeModulesPath, f))
          ) {
            return true;
          }
          return false;
        })
        .map( (r)=> {
          return path.join(nodeModulesPath, r, 'commands');
        });
    } catch(e) {

    }
  },
  walk: walk,
  listFilesRecursive: walk
};

/**
 * List files in dir in parallel
 *
 * see: http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
 *
 * @param  {String}   dir
 * @param  {Function} done run with error, files
 */
function walk(dir, done) {
  let results = [];

  fs.readdir(dir, (err, list)=> {
    if (err) {
      if (err.code === 'ENOENT') {
        return done(null, []);
      } else {
        return done(err);
      }
    }
    let pending = list.length;
    if (!pending) return done(null, results);

    list.forEach( (file)=> {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat)=> {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res)=> {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

/**
 * Function to check if one module path is an we.js plugin
 * @param  {String}  nodeModulePath
 * @return {Boolean}
 */
function isPlugin(nodeModulePath) {
  // then check if the npm module is one plugin
  try {
    if (fs.statSync( path.resolve( nodeModulePath, 'plugin.js' ) )) {
      return true;
    } else {
    return false;
    }
  } catch(e) {
    return false;
  }
}

module.exports =helpers;