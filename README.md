# We.js ;) *beta*

> A framework based in **plugins** for fast development, use it for create node.js projects like real time social networks, sites or blogs written with javascript.

Status:  **in development**

##ROADMAP for 0.2.x

- Create one site for the project with we.js site generator
- Client side automatic model generation based in sails models - DONE - :white_check_mark:
- Finish yeoman generator for blog - DONE - :white_check_mark:
- Finish yeoman generator for sites
- Finish yeoman generator for social network systems
- Change this project to be a cli - DONE - :white_check_mark:
- Split we-cs-core to related server side modules - DONE - :white_check_mark:

##About

We.js features:

 - [plugins](https://github.com/wejs?query=plugin)
 - [themes](https://github.com/wejs?query=theme)
 - Generators ( with Yeoman ) | https://github.com/wejs/generator-wejs
 - Administration interface
 - Build in and extendable grunt tasks
 - Model, permissions and public config sync between cliend and server
   - Define one model in sails and it auto generate the Ember.js model
   - Make variables avaible in client with sails.config.clientside.publicVars
   - Configs set in /admin#/permissions is valid to client with can helper and server with sails.acl.can function

#How to install?

1 - install dependencies:

* Mysql http://www.mysql.com/ ( for data storage )
* Node.js http://nodejs.org/
* npm https://npmjs.org/
* graphicsmagick http://www.graphicsmagick.org/ ( for image resize )
* Bower http://bower.io/ ( Opcional )

2 - Install and get started:

> Check we.js site: http://wejs.org/


---------------

#File structure  v0.3.x

## App file structure
```
server/ #( project api folder )
- controllers/
- models/
- responses/
- services/
bin/
- [project script files for run in terminal]
client/
- app/
- - emberApp.js ( run before load project resouces and set window.App object )
- - afterEmberFilesLoaded.js ( run after load project resouces use to configure something )
- appAdmin
- - emberApp.js
- - afterEmberFilesLoaded.js
config/ #( we.js project config folder )
- local.js ( local config file )
- [others config files]
- - locales/ #( node i18n locales files used in client and server )
- - - [locale].json
files/
- public/ #( public default production assets folder )
tasks/ #( grunt tasks )
- config
- - [project custom tasks or core config change]
- register
- - [project custom tasks or core tasks change]
test/ #( tests folder with mocha )
- integration/
- - api/ #( serverside api tests )
- - - [mocha test files]
- bootstrap.js
- mocha.opts
bower.json ( opcional )
package.json
app.js
```

## Plugin file structure
```
client/ ( ember.js files )
- app/ ( [host]/públic/plugin/[plugin-name]/app/.. )
- - beforeAll/ (libs how run before all .js files )
- - - [file].js
- - libs/
- - mixins/
- - helpers/
- - adapters/
- - components/
- - controllers/
- - models/
- - routes/
- - templates/
- - - components/
- - - [feature]/
- - - [template].hbs
- appAdmin/ ( [host]/públic/plugin/[plugin-name]/appAdmin/.. )
- shared/ ( same structure as app but is load in app and appAdmin clientside projects )
lib/ ( npm module folder )
- index.js ( initial file how load in with require )
server/ ( we.js server files )
- controllers
- - [controller].js
- models/
- - [model].js
README.md
package.json
plugin.js ( you plugin file )
```

**Have a question, found an error or wants to help?**

> * Open a [issue](https://github.com/wejs/we/issues)
> * Submit a pull request to one subproject: https://github.com/wejs/
> * **Generate and test** one we.js project
> * **Hack it!** and give feedback, we fix and then we.js becomes more secure ;)
> * Or spread to the world!

***If want see or test a We.js live example access: http://wejs.org/*** :eyes:


## Avaible plugins

Check: https://github.com/wejs?query=plugin

## How to Run

In terminal tip:

```sh
node .
```

## How to Test

#### With 'npm test':

```sh
npm test
```

#### Run selected tests with mocha --grep

```sh
mocha test/bootstrap.js test/**/*.test.js -g '/auth/1/change-password'
```

## Build with:
* Node.js - http://nodejs.org/
* Mysql
* Ember.js - http://emberjs.com/
* [Love](http://www.lovecalculator.com/)

## Links

> * Team: https://github.com/orgs/wejs/people
> * Contributors: https://github.com/wejs/we/graphs/contributors
> * Sails.js  http://sailsjs.org - some code logic get from sails.js

## Copyright and license

Copyright 2013-2014 Alberto Souza <alberto.souza.dev@gmail.com> and [contributors](https://github.com/wejs/we/graphs/contributors) , under [the MIT license](LICENSE).
