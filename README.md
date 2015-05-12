# We.js ;) *beta*

> For about and infos see: http://wejs.org/

Status:  **in development**

##ROADMAP for 0.2.x

- Create one site for the project with we.js site generator DONE - :white_check_mark: http://wejs.org
- Client side automatic model generation based in sails models - DONE - :white_check_mark:
- Yeoman generator for blog - DONE - :white_check_mark:
- Yeoman generator for social network
- Change this project to be a cli - DONE - :white_check_mark:

##About

##We.js features:

### API

- Generators ( with Yeoman ) | https://github.com/wejs/generator-wejs
- [Plugins](https://github.com/wejs?query=plugin)
- [Themes](https://github.com/wejs?query=theme)
- Hooks 
- Events
- ACL
- Build in and extendable grunt tasks
- ORM ( with sequelize )

### Resources

- Administrative Interface
- Build in grunt tasks
- Pages
- Comments
- Groups
- Messenger

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
