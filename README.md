# We.js ;)

> A framework based in **plugins** for fast development, use it for create node.js projects like real time social networks, sites or blogs written with javascript.

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

* Redis http://redis.io/ ( for session storage )
* Mysql http://www.mysql.com/ ( for data storage )
* Node.js http://nodejs.org/
* npm https://npmjs.org/
* Bower http://bower.io/ ( some we.js projects dont need bower )
* graphicsmagick http://www.graphicsmagick.org/ ( for image resize )

2 - Install it globaly:

```shell
npm install we -g
```

3 - Generate one project

```shell
we generate blog
```

---------------

#File structure

## App file structure
```
api/ #( sails.js project api folder )
- controllers/
- models/
- responses/
- services/
assets/
- core/ # ( files here will be avaible in [host]/core/...  )
bin/
- loadSails.js #( sails loader script )
- [project script files for run in terminal]
client/
- app/
- - emberApp.js ( run before load project resouces and set window.App object )
- - afterEmberFilesLoaded.js ( run after load project resouces use to configure something )
- appAdmin
- - TODO
config/ #( sails.js project config folder )
- local.js ( local config file )
- [others sails.js config files]
- - locales/ #( sails.js locales files used in client and server )
- - - [locale].json
files/
- assets/ #( public default production assets folder )
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
bower.json
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
- assets/ ( plugin assets file, will be avaible at [host]/públic/plugin/[plugin-name]/assets/... )
config/
- routes.js ( plugin route config, see sails.js route docs )
lib/ ( npm module folder )
- hook.js ( sails.js plugin hook )
- index.js ( initial file how load in with require )
- mdoelsAlter.js ( use to alter a sails.js model from other plugin )
server/ ( sails.js files )
- controllers
- - [controllers].js
- models/
- - [models].js
- services/
- - ...
README.md
package.json
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

## How to configure

We.js is a sails.js project then see [sails site](http://sailsjs.org/) for file configs

## How to Run

In terminal tip:

```sh
node .
```

Or with auto restart and watch:

```sh
npm start
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
* Sails.js - http://sailsjs.org
* Node.js - http://nodejs.org/
* Mysql
* Ember.js - http://emberjs.com/
* [Love](http://www.lovecalculator.com/)

## Links

> * Team: https://github.com/orgs/wejs/people
> * Contributors: https://github.com/wejs/we/graphs/contributors
> * Sails.js  http://sailsjs.org - some code is get from sails.js CLI

## Copyright and license

Copyright 2013-2014 Alberto Souza <alberto.souza.dev@gmail.com> and [contributors](https://github.com/wejs/we/graphs/contributors) , under [the MIT license](LICENSE).
