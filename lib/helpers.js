var path = require('path');
var fs = require('fs');
var sget = require('sget');

var helpers = {
  cliTable: require('cli-table'),
  sget: sget,
  getWe: function getWe() {
    try {
      var projectFolder = process.cwd();
      var We = require( path.resolve( projectFolder, 'node_modules/we-core' ));
      return new We();
    } catch(e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        console.error('we-core not found, we.js cli only works in project folder');
        process.exit();
      } else {
        throw e;
      }
    }
  },
  checkIfAreInProject: function checkIfAreInProject() {
    var weCoreFolder = path.resolve( process.cwd(), 'node_modules/we-core' );
    try {
      return fs.statSync(weCoreFolder);
    } catch(e) {
      return false;
    }
  },
  notInProjectError: function notInProjectError() {
    console.error(
      'we-core not found, possible problems: \n\n'+
      '1- run "npm install" for install we-core and others dependencies in your project\n'+
      '2- "we run" we.js cli command only works in project folder\n'
    );
  },

  loadCLICommands: function loadCLICommands() {
    var dir = path.join(__dirname, 'commands');
    return this.loadCommands(dir);
  },

  loadProjectCommands: function loadProjectCommands() {
    var dir = path.join(process.cwd(), 'commands');
    return this.loadCommands(dir);
  },
  loadProjectPluginsCommands: function loadProjectPluginsCommands() {
    var pluginList = this.getPluginsList();

    var plugins = {};

    if (pluginList) {
      for (var i = 0; i < pluginList.length; i++) {
        plugins[pluginList[i]] = this.loadCommands(pluginList[i]);
      }
    }


    return plugins;
  },

  loadCommands: function loadCommands(dir) {
    var commands = [];

    try {
      fs.readdirSync(dir)
      .forEach(function(fileName) {
        if (fileName.endsWith('.js')) {
          commands.push(require(path.join(dir, fileName)));
        }
      });
    } catch(e) {
      if (e.code !== 'ENOENT') throw e;
    }

    return commands;
  },

  runCommandFNs: function runCommandFNs(commands, program) {
    var i;
    // cli
    commands.cli.forEach(function(pf) {
      pf(program, helpers);
    });
    // project
    commands.project.forEach(function(pf) {
      pf(program, helpers);
    });
    // plugins
    for(var pluginName in commands.plugins) {
      for (i = 0; i < commands.plugins[pluginName].length; i++) {
        commands.plugins[pluginName][i](program, helpers);
      }
    }
  },

  getPluginsList: function getPluginsList() {
    var nodeModulesPath = path.join(process.cwd(),'node_modules');

    try {
      var folders = fs.readdirSync(nodeModulesPath);

      return folders
        .filter(function (f) {
          if (
            f.substring(0, 3) === 'we-' &&
            isPlugin(path.join(nodeModulesPath, f))
          ) return true;
          return false;
        })
        .map(function (r) {
          return path.join(nodeModulesPath, r, 'commands');
        })
    } catch(e) {

    }
  }
};

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